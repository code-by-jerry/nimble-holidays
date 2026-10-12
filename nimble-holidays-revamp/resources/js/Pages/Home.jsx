import React, { useMemo, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

const destinations = [
  { id: 'alleppey', name: 'Alleppey', region: 'Kerala', type: 'Backwaters', days: '2–3 days', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85', desc: 'Slow mornings on Kerala’s tranquil backwaters.' },
  { id: 'munnar', name: 'Munnar', region: 'Kerala', type: 'Hill station', days: '2–3 days', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=85', desc: 'Rolling tea gardens, misty hills and cool air.' },
  { id: 'varkala', name: 'Varkala', region: 'Kerala', type: 'Beach', days: '1–2 days', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=85', desc: 'Cliffside views and relaxed Arabian Sea sunsets.' },
  { id: 'wayanad', name: 'Wayanad', region: 'Kerala', type: 'Nature', days: '2–3 days', image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=85', desc: 'Forest trails, waterfalls and green escapes.' },
  { id: 'jaipur', name: 'Jaipur', region: 'India', type: 'Culture', days: '2–3 days', image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=900&q=85', desc: 'Palaces, colorful markets and living history.' },
  { id: 'bali', name: 'Bali', region: 'International', type: 'Island escape', days: '4–6 days', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85', desc: 'Tropical landscapes, temples and island culture.' },
];
const services = [
  ['✈', 'Flight assistance', 'Domestic and international ticket enquiries.'],
  ['⌂', 'Hotels & stays', 'Find stays that suit your trip and budget.'],
  ['↗', 'Transfers & transport', 'Airport pickups, cars, vans and coaches.'],
  ['✿', 'Kerala Ayurveda', 'Personalized wellness and rejuvenation stays.'],
];

export default function Home() {
  const [region, setRegion] = useState('All');
  const [selected, setSelected] = useState([]);
  const [showPlanner, setShowPlanner] = useState(false);
  const visible = useMemo(() => destinations.filter(d => region === 'All' || d.region === region), [region]);
  const form = useForm({ name: '', whatsapp: '', residence: '', start_date: '', end_date: '', adults: '2', children: '0', accommodation: 'Comfort', budget: '', currency: 'INR', services: [], notes: '', destinations: [] });
  const toggleDestination = (id) => setSelected(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id]);
  const toggleService = (value) => form.setData('services', form.data.services.includes(value) ? form.data.services.filter(x => x !== value) : [...form.data.services, value]);
  const submit = (e) => { e.preventDefault(); form.setData('destinations', selected); form.post('/trip-enquiries'); };
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent('Hello Nimble Holidays, I would like help planning a customized trip.')}`;

  return <>
    <Head title="Nimble Holidays | The World Is for Everyone" meta={[{ name: 'description', content: 'Discover destinations and build a personalized holiday with Nimble Holidays. Since 2010 in Kerala.' }]} />
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#home" aria-label="Nimble Holidays home">
          <img src="/images/nimble-logo.png" alt="Nimble Holidays" onError={e => { e.currentTarget.style.display = 'none'; }} />
          <span className="brand-fallback">NIMBLE <small>HOLIDAYS</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#destinations">Destinations</a><a href="#how-it-works">How it works</a><a href="#packages">Packages</a><a href="#services">Services</a></nav>
        <a className="button button-outline header-cta" href={whatsappHref} target="_blank" rel="noreferrer">Let’s talk <span>↗</span></a>
      </div>
    </header>

    <main id="home">
      <section className="hero">
        <div className="hero-photo" role="img" aria-label="Traditional houseboat on Kerala backwaters surrounded by palm trees" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="eyebrow light"><span className="eyebrow-dot" /> YOUR NEXT CHAPTER STARTS HERE</div>
          <h1>The world is<br /> <em>for everyone.</em></h1>
          <p>Not just a package. A trip that feels like yours. Choose the places you love and we’ll help bring them together.</p>
          <div className="hero-actions"><a className="button button-primary" href="#destinations">Build your own trip <span>↗</span></a><a className="text-link light-link" href="#how-it-works">How it works <span>↓</span></a></div>
          <div className="hero-note"><span className="note-rule" /> Proudly helping travellers explore since 2010 <span className="note-place">Kerala, India</span></div>
        </div>
        <div className="hero-stamp"><span>YOUR JOURNEY</span><strong>YOUR WAY</strong><i>✳</i></div>
      </section>

      <section className="trust-strip"><div className="container trust-inner"><div><b>Since 2010</b><span>Travel experience that matters</span></div><div><b>Made around you</b><span>Personalized itineraries</span></div><div><b>Here to help</b><span>Real people, easy conversations</span></div></div></section>

      <section className="section destinations-section" id="destinations">
        <div className="container">
          <div className="section-heading heading-row"><div><div className="eyebrow"><span className="eyebrow-dot" /> FIND YOUR SOMEWHERE</div><h2>Places worth<br className="mobile-break" /> <em>getting lost in.</em></h2></div><p>From quiet Kerala mornings to faraway city lights, start with the places that speak to you.</p></div>
          <div className="filter-row" role="group" aria-label="Filter destinations">{['All', 'Kerala', 'India', 'International'].map(item => <button key={item} className={`filter-chip ${region === item ? 'active' : ''}`} onClick={() => setRegion(item)} aria-pressed={region === item}>{item}</button>)}<span className="selected-count">{selected.length} {selected.length === 1 ? 'place' : 'places'} selected</span></div>
          <div className="destination-grid">{visible.map((d, i) => <article className={`destination-card ${i === 0 ? 'featured-card' : ''}`} key={d.id}>
            <div className="destination-image"><img src={d.image} alt={`${d.name}, ${d.region}`} loading="lazy" /><span className="image-tag">{d.type}</span><button className={`save-button ${selected.includes(d.id) ? 'saved' : ''}`} aria-label={`${selected.includes(d.id) ? 'Remove' : 'Add'} ${d.name} ${selected.includes(d.id) ? 'from' : 'to'} trip`} aria-pressed={selected.includes(d.id)} onClick={() => toggleDestination(d.id)}>{selected.includes(d.id) ? '✓' : '+'}</button></div>
            <div className="destination-info"><div><span className="destination-region">{d.region} · {d.days}</span><h3>{d.name}</h3><p>{d.desc}</p></div><button className={`add-link ${selected.includes(d.id) ? 'added' : ''}`} onClick={() => toggleDestination(d.id)}>{selected.includes(d.id) ? 'Added to trip ✓' : 'Add to my trip ↗'}</button></div>
          </article>)}</div>
          <div className="destination-bottom"><span>Can’t find your destination? Tell us what you have in mind.</span><a href="#trip-planner" onClick={() => setShowPlanner(true)} className="text-link">Plan something different ↗</a></div>
        </div>
      </section>

      <section className="how-section" id="how-it-works"><div className="container how-grid"><div className="how-copy"><div className="eyebrow light"><span className="eyebrow-dot" /> SIMPLE BY DESIGN</div><h2>Your trip.<br /><em>Your choices.</em></h2><p>Think of it like building your own travel wishlist. Pick what you love, share a few details and our team will shape it into a trip that works for you.</p><a className="button button-light" href="#destinations">Start exploring <span>↗</span></a></div><div className="steps-list"><div className="step"><span className="step-number">01</span><div><h3>Choose your places</h3><p>Add destinations and experiences to your trip list.</p></div><span className="step-symbol">⌖</span></div><div className="step"><span className="step-number">02</span><div><h3>Tell us the details</h3><p>Share dates, travellers, stay preferences and budget.</p></div><span className="step-symbol">✳</span></div><div className="step"><span className="step-number">03</span><div><h3>Get a trip made for you</h3><p>Our team prepares a tailored itinerary and quotation.</p></div><span className="step-symbol">↗</span></div></div></div></section>

      <section className="section packages-section" id="packages"><div className="container"><div className="section-heading heading-row"><div><div className="eyebrow"><span className="eyebrow-dot" /> A LITTLE INSPIRATION</div><h2>Good trips start<br /> <em>with a feeling.</em></h2></div><p>Need a starting point? Explore a few ideas and we’ll personalize the details around you.</p></div><div className="package-grid"><article className="package-card package-kerala"><img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85" alt="Kerala backwaters and tropical greenery" loading="lazy"/><div className="package-overlay"><span>01 / SLOW TRAVEL</span><h3>Kerala, at your pace.</h3><p>Backwaters, tea gardens and coastal hideaways.</p><a href="#trip-planner" onClick={() => { setSelected(s => [...new Set([...s, 'alleppey', 'munnar'])]); setShowPlanner(true); }} className="round-arrow">↗</a></div></article><article className="package-card package-wellness"><img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=85" alt="Peaceful wellness retreat surrounded by greenery" loading="lazy"/><div className="package-overlay"><span>02 / RESET & RECHARGE</span><h3>Make room to feel good.</h3><p>Thoughtful Ayurveda and wellness getaways.</p><a href="#services" className="round-arrow">↗</a></div></article><article className="package-card package-world"><img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85" alt="Tropical Bali island landscape" loading="lazy"/><div className="package-overlay"><span>03 / FURTHER AFIELD</span><h3>Somewhere new.</h3><p>International escapes, shaped around you.</p><a href="#destinations" onClick={() => setRegion('International')} className="round-arrow">↗</a></div></article></div></div></section>

      <section className="services-section" id="services"><div className="container"><div className="section-heading heading-row"><div><div className="eyebrow"><span className="eyebrow-dot" /> MORE THAN A DESTINATION</div><h2>We’ll help with<br /><em>the in-between.</em></h2></div><p>The little details matter. Get support for the parts of travel that make the whole journey easier.</p></div><div className="services-grid">{services.map(([icon, title, desc]) => <article className="service-card" key={title}><span className="service-icon">{icon}</span><h3>{title}</h3><p>{desc}</p><a href={title === 'Flight assistance' ? '#flight-enquiry' : '#trip-planner'} onClick={() => title !== 'Flight assistance' && setShowPlanner(true)} aria-label={`Enquire about ${title}`}>Enquire <span>↗</span></a></article>)}</div></div></section>

      <section className="planner-section" id="trip-planner"><div className="container planner-wrap"><div className="planner-intro"><div className="eyebrow light"><span className="eyebrow-dot" /> LET’S MAKE IT HAPPEN</div><h2>Have a place<br /> <em>in mind?</em></h2><p>Tell us a little about the trip you’re imagining. We’ll take it from there with a personalized itinerary and quotation.</p><div className="planner-assurance"><span>✳</span><p>No complicated booking engine. Just a thoughtful plan, made with you.</p></div></div><form className={`planner-form ${showPlanner ? 'form-highlight' : ''}`} onSubmit={submit}>
        <div className="form-top"><span>YOUR TRIP BRIEF</span><span>01 — 04</span></div><h3>Let’s start with the basics.</h3><p className="form-help">Selected places: {selected.length ? destinations.filter(d => selected.includes(d.id)).map(d => d.name).join(', ') : 'Choose destinations above, or tell us below.'}</p>
        <div className="form-fields"><label>Full name<input required value={form.data.name} onChange={e => form.setData('name', e.target.value)} placeholder="Your name" autoComplete="name" /></label><label>WhatsApp number<input required type="tel" value={form.data.whatsapp} onChange={e => form.setData('whatsapp', e.target.value)} placeholder="+91 98765 43210" autoComplete="tel" /></label><label>Where are you travelling from?<input value={form.data.residence} onChange={e => form.setData('residence', e.target.value)} placeholder="e.g. Riyadh, Saudi Arabia" /></label><div className="field-pair"><label>Travel starts<input type="date" min={new Date().toISOString().slice(0,10)} value={form.data.start_date} onChange={e => form.setData('start_date', e.target.value)} /></label><label>Travel ends<input type="date" min={form.data.start_date || new Date().toISOString().slice(0,10)} value={form.data.end_date} onChange={e => form.setData('end_date', e.target.value)} /></label></div><div className="field-pair"><label>Adults<input type="number" min="1" max="30" value={form.data.adults} onChange={e => form.setData('adults', e.target.value)} /></label><label>Children<input type="number" min="0" max="30" value={form.data.children} onChange={e => form.setData('children', e.target.value)} /></label></div><div className="field-pair"><label>Stay preference<select value={form.data.accommodation} onChange={e => form.setData('accommodation', e.target.value)}><option>Comfort</option><option>Budget-friendly</option><option>Premium</option><option>Luxury</option><option>Open to suggestions</option></select></label><label>Budget per person<div className="budget-field"><select aria-label="Currency" value={form.data.currency} onChange={e => form.setData('currency', e.target.value)}><option>INR</option><option>SAR</option><option>AED</option><option>QAR</option><option>OMR</option><option>KWD</option></select><input type="number" min="0" value={form.data.budget} onChange={e => form.setData('budget', e.target.value)} placeholder="Flexible" /></div></label></div><fieldset className="service-options"><legend>Anything else we can help with?</legend><div>{['Flight tickets', 'Hotels', 'Airport transfers', 'Sightseeing', 'Ayurveda'].map(s => <button type="button" key={s} className={`option-chip ${form.data.services.includes(s) ? 'chosen' : ''}`} onClick={() => toggleService(s)} aria-pressed={form.data.services.includes(s)}>{form.data.services.includes(s) ? '✓ ' : '+ '}{s}</button>)}</div></fieldset><label>Anything else we should know?<textarea rows="3" value={form.data.notes} onChange={e => form.setData('notes', e.target.value)} placeholder="Occasion, interests, must-see places…" /></label></div>
        {form.errors && Object.keys(form.errors).length > 0 && <p className="form-error">{Object.values(form.errors).join(' ')}</p>}
        <button className="button button-primary submit-button" type="submit" disabled={form.processing}>{form.processing ? 'Sending your enquiry…' : 'Request my custom quotation'} <span>↗</span></button><p className="privacy-note">Your details are only used to help plan your trip. No payment is taken here.</p>
      </form></div></section>

      <section className="flight-strip" id="flight-enquiry"><div className="container flight-inner"><div><span className="eyebrow"><span className="eyebrow-dot" /> JUST NEED A TICKET?</span><h2>Let’s get you <em>there.</em></h2><p>Need a domestic or international flight? Our team can help you explore the options.</p></div><a className="button button-outline" href={whatsappHref} target="_blank" rel="noreferrer">Ask about flights <span>↗</span></a></div></section>
    </main>

    <footer className="footer"><div className="container footer-main"><div><a className="footer-brand" href="#home">NIMBLE <span>HOLIDAYS</span></a><p>The World Is for Everyone.</p></div><div className="footer-location"><span>ROOTED IN KERALA. OPEN TO THE WORLD.</span><p>Onattukara, Mavelikkara, Kerala, India<br />Helping travellers explore since 2010.</p></div><div className="footer-links"><a href="#destinations">Destinations</a><a href="#trip-planner">Create your trip</a><a href="#services">Travel services</a><a href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp ↗</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Nimble Holidays</span><span>Thoughtfully planned. Personally yours.</span></div></footer>
    <a className="floating-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Contact Nimble Holidays on WhatsApp">◔ <span>WhatsApp us</span></a>
  </>;
}
