export interface AyurvedaProgram {
  id: string;
  name: string;
  sanskritName: string;
  recommendedDuration: string;
  tagline: string;
  description: string;
  treatments: string[];
  benefits: string[];
  idealFor: string;
  image: string;
}

export const AYURVEDA_PROGRAMS: AyurvedaProgram[] = [
  {
    id: 'ayur-rejuvenation',
    name: 'Body Rejuvenation & Rasayana',
    sanskritName: 'Rasayana Chikitsa',
    recommendedDuration: '7 to 14 Days',
    tagline: 'Deep cellular revitalization, improved vitality and natural anti-aging',
    description: 'A gentle and restorative classical treatment to tone the muscles, improve circulation, revitalize the nerve cells, and boost the body’s innate immune system (Ojas). Recommended for busy professionals, seniors, and anyone needing whole-body recharge.',
    treatments: [
      'Abhyanga (Synchronized medicated warm oil herbal massage)',
      'Shirodhara (Continuous stream of warm medicated herbal oil on forehead)',
      'Njavarakizhi (Massage with warm herbal rice puddings tied in muslin bags)',
      'Ksheeradhumam (Herbal steam bath infused with natural forest herbs)',
    ],
    benefits: [
      'Recharges cellular vitality and combats mental exhaustion',
      'Softens and hydrates dry skin while toning muscle tissues',
      'Improves sleep cycles and deep restorative rest',
      'Calms agitated Vata dosha and elevates moods',
    ],
    idealFor: 'Fatigue, general debility, age-related stiffness, vitality renewal',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'ayur-stress-sleep',
    name: 'Stress Relief, Calm & Sleep Therapy',
    sanskritName: 'Manasika Shanthi',
    recommendedDuration: '7 to 10 Days',
    tagline: 'Release mental tension, quiet racing thoughts and heal nervous strain',
    description: 'Specifically curated for individuals with demanding professional schedules, chronic insomnia, and anxiety. This soothing regimen calms the central nervous system, stabilizes neuro-hormones, and re-establishes healthy circadian rhythm.',
    treatments: [
      'Tailadhara & Ksheeradhara (Herbal milk/oil forehead drip for the mind)',
      'Thalam (Herbal cooling medicinal paste applied to the crown of the head)',
      'Padabhyanga (Medicated herbal foot massage balancing energy channels)',
      'Yoga Nidra & Guided backwater meditation sessions',
    ],
    benefits: [
      'Drastically eases insomnia, tension headaches and sensory overload',
      'Reduces elevated cortisol (stress hormone) levels',
      'Improves mental clarity, patience and emotional resilience',
      'Restores peaceful, uninterrupted natural sleep',
    ],
    idealFor: 'Corporate executives, GCC professionals, insomnia, anxiety',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'ayur-panchakarma',
    name: 'Classical Panchakarma Detoxification',
    sanskritName: 'Shodhana Chikitsa',
    recommendedDuration: '14 to 21 Days',
    tagline: 'Complete bio-cleansing eliminating deep cellular toxins (Ama)',
    description: 'The pinnacle of authentic Ayurvedic healing. A structured multi-phase protocol (Preparation, Cleansing, Restoration) overseen daily by senior Ayurvedic physicians to cleanse accumulated environmental and metabolic toxins from the gut and tissues.',
    treatments: [
      'Snehana & Swedana (Internal oleation and therapeutic herbal steam)',
      'Virechana (Supervised therapeutic metabolic purgation)',
      'Vasthi (Herbal enema therapies balancing the entire metabolic axis)',
      'Nasyam (Medicated herbal nasal drops clearing the head sinuses and eyes)',
    ],
    benefits: [
      'Deep purification of systemic metabolic impurities (Ama)',
      'Resets digestive fire (Agni) and enhances nutrient absorption',
      'Balances all three bio-energies: Vata, Pitta, and Kapha',
      'Provides a clean biological slate with long-lasting vitality',
    ],
    idealFor: 'Metabolic sluggishness, digestive disorders, chronic skin ailments',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'ayur-spine-joint',
    name: 'Spine, Back & Joint Care',
    sanskritName: 'Sandhi & Asthi Chikitsa',
    recommendedDuration: '10 to 14 Days',
    tagline: 'Targeted relief for cervical spondylosis, lower back pain and arthritic stiffness',
    description: 'Formulated to alleviate spinal column distress, degenerative disc stiffness, sciatica, and joint inflammation caused by prolonged desk hours or age. Uses localized medicated oil wells and warm poultices to nourish cartilage and ligaments.',
    treatments: [
      'Kativasthi (Warm herbal oil reservoir contained over the lower lumbar spine)',
      'Greevavasthi (Localized medicated oil well on the cervical neck spine)',
      'Elakizhi (Warm herbal leaf bundles dipped in medicated oil and applied firmly)',
      'Pizhichil (Royal warm medicated oil bath poured in rhythmic continuous streams)',
    ],
    benefits: [
      'Lubricates stiff spinal vertebrae and eases compressed nerve roots',
      'Relieves chronic lumbar aches, sciatica, and cervical shoulder stiffness',
      'Strengthens supportive para-spinal muscles and joint connective tissue',
      'Restores easy painless mobility and posture',
    ],
    idealFor: 'Desk workers, drivers, athletes, chronic back pain, joint stiffness',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1000&q=85',
  },
];
