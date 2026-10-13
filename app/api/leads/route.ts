import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export interface LeadPayload {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  serviceCategory: string; // e.g. 'doorstep-transit' | 'flight' | 'package' | 'ayurveda' | 'general'
  serviceTitle?: string;
  origin?: string;
  destination?: string;
  transitHub?: string;
  passengerType?: string; // 'family' | 'solo' | 'couple' | 'elderly' | 'group'
  adults?: string | number;
  children?: string | number;
  travelDate?: string;
  accommodationTier?: string;
  flightIncluded?: boolean;
  cabIncluded?: boolean;
  notes?: string;
  channel?: 'whatsapp' | 'web-form';
  createdAt?: string;
}

const LEADS_FILE_PATH = path.join(process.cwd(), 'data', 'leads.json');

// Helper to safely read existing leads
async function getExistingLeads(): Promise<LeadPayload[]> {
  try {
    const content = await fs.readFile(LEADS_FILE_PATH, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (err) {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Helper to safely append new lead
async function saveLead(lead: LeadPayload): Promise<void> {
  try {
    const existing = await getExistingLeads();
    existing.unshift(lead); // Newest first
    await fs.writeFile(LEADS_FILE_PATH, JSON.stringify(existing.slice(0, 1000), null, 2), 'utf-8');
  } catch (err) {
    console.error('[Nimble Holidays] Failed to write lead to leads.json:', err);
  }
}

// Forward lead to Google Sheets webhook if configured
async function forwardToGoogleSheets(lead: LeadPayload): Promise<{ forwarded: boolean; error?: string }> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return { forwarded: false };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: lead.createdAt,
        leadId: lead.id,
        serviceCategory: lead.serviceCategory,
        serviceTitle: lead.serviceTitle || lead.serviceCategory,
        name: lead.name,
        phone: lead.phone,
        email: lead.email || '',
        origin: lead.origin || '',
        destination: lead.destination || '',
        passengerType: lead.passengerType || '',
        groupSize: `${lead.adults || 1} Adult(s), ${lead.children || 0} Child(ren)`,
        travelDate: lead.travelDate || '',
        notes: lead.notes || '',
        channel: lead.channel || 'web-form',
      }),
      // Set 4s timeout so it never stalls user response
      signal: AbortSignal.timeout(4000),
    });

    return { forwarded: response.ok };
  } catch (err: any) {
    console.warn('[Nimble Holidays] Google Sheets webhook error:', err?.message || err);
    return { forwarded: false, error: err?.message };
  }
}

export async function POST(req: NextRequest) {
  try {
    let body: LeadPayload;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON request format.' },
        { status: 400 }
      );
    }

    if (!body || !body.name?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { error: 'Name and phone number are required to submit an enquiry lead.' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const prefix =
      body.serviceCategory === 'doorstep-transit'
        ? 'DOOR'
        : body.serviceCategory === 'flight'
        ? 'FLT'
        : 'LEAD';

    const leadId = `NH-${prefix}-${Date.now().toString(36).slice(-5).toUpperCase()}`;

    const enrichedLead: LeadPayload = {
      ...body,
      id: leadId,
      name: body.name.trim(),
      phone: body.phone.trim(),
      serviceCategory: body.serviceCategory || 'general',
      createdAt: timestamp,
      channel: body.channel || 'whatsapp',
    };

    // 1. Save to local data store
    await saveLead(enrichedLead);

    // 2. Asynchronously forward to Google Sheets (if webhook configured)
    const sheetsResult = await forwardToGoogleSheets(enrichedLead);

    return NextResponse.json({
      success: true,
      leadId,
      timestamp,
      message: 'Enquiry lead recorded successfully.',
      sheetsForwarded: sheetsResult.forwarded,
    });
  } catch (error: any) {
    console.error('[Nimble Holidays] Error recording lead:', error);
    return NextResponse.json(
      { error: 'Failed to record lead. Please try again or contact via WhatsApp.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const allLeads = await getExistingLeads();
    const filtered = category
      ? allLeads.filter((l) => l.serviceCategory.toLowerCase() === category.toLowerCase())
      : allLeads;

    return NextResponse.json({
      count: filtered.length,
      categoryFilter: category || 'all',
      leads: filtered.slice(0, 50),
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to retrieve leads' }, { status: 500 });
  }
}
