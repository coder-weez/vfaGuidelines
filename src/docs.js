// VFA field documentation standards.
// Each key matches the EMSCharts element name attribute.
// Add or update entries here to maintain org documentation standards.

var VFA_DOCS = {

    // ── Page 2 ────────────────────────────────────────────────────────────
    // chief complaint, HPI, patient belongings, and scene description icons placed on section headers via VFA_DOCS_SELECTOR below
    'PRMAIN_level_care_per_protocol': 'Select the level of care provided per protocol (BLS or ALS).',

    // ── Page 3 ────────────────────────────────────────────────────────────
    'stroke_scale': 'Document the results of the stroke scale exam (Cincinnati Stroke Scale). Any abnormal finding in any category indicates a positive screen.',
    'head_reactive': 'Document any additional pupil or eye findings not captured by the structured size/reactivity fields.',
    'head_sensory': 'Document any additional sensory findings not captured by the structured extremity fields.',
    'motor_comments': 'Document any additional motor findings not captured by the structured extremity fields.',
    'AIR_STATUS': 'Required — do not leave blank. Select the descriptor that most accurately describes the airway condition on initial contact.',
    'AIR_COMMENTS': 'Document all pertinent airway findings on initial contact. If airway is not secured, document that here.',
    'air_by': 'Select the type of provider who performed the airway maneuver.',
    'air_outcome': 'Document the patient\'s response to airway maneuvers performed prior to arrival.',

    // ── Page 4 ────────────────────────────────────────────────────────────
    'RESP_COMMENTS': 'Document any other pertinent information about the patient\'s respiratory status or response to supplemental oxygen administration.',
    // breath sounds icon placed on label via VFA_DOCS_SELECTOR below
    // cardiovascular pulses summarized on section header via VFA_DOCS_SELECTOR below

    // page 8 activity log icon placed on Comments label via VFA_DOCS_SELECTOR below

    // ── Page 5 ────────────────────────────────────────────────────────────
    'head_comments': 'Document: skull/facial/mandible deformity, dental damage, blood or CSF from ears/nose, periorbital ecchymosis, Battle\'s Sign, extraocular movements, sclera color, nostril flaring, fontanelle (infants), facial droop/slurred speech, respiratory effort, and any injuries.',
    'neck_comments': 'Document: neck vein condition, lymphadenopathy/masses, nuchal rigidity, accessory muscle use, subcutaneous air, and any injuries.',
    'chest_comments': 'Document: DCAP/BTLS findings, asymmetrical chest movement, crepitus on palpation, subcutaneous air, accessory muscle use or sternal/intracostal retractions, lung sounds bilaterally, adventitious breath sounds, and all injuries.',
    'ap_appearance': 'Document general abdominal appearance (round, flat, obese, distended, gravid, etc.).',
    'ap_palpation': 'Document: tenderness, rebound tenderness, guarding, rigidity, and presence/absence of masses.',
    'ap_bowel_sounds': 'Document presence/absence and quality of bowel sounds.',
    'ap_findings': 'Document: DCAP/BTLS abdominal findings, nausea/vomiting, and description of any injuries.',
    'pelvis_comments': 'Document: pelvic stability to lateral and A/P flexion, incontinence, blood at meatus, rectal bleeding, and femoral pulses.',
    'back_comments': 'If patient in SMR prior to arrival, document "PE of back deferred d/t pt. in SMR PTOA" and query placing providers for their findings. Otherwise document DCAP/BTLS for posterior thorax, flanks, and lumbar area, and describe any injuries.',
    'ex_comments': 'Document for all extremities: gross motor and sensory function, peripheral pulses, lack of use, deformity/angulation/discoloration/swelling, and wounds.',
    'ex_skin_findings': 'Document: skin color and temperature, skin turgor, presence of petechia/purpura/surgical scars, and any injuries.'

};

// Selector-based entries: keys are CSS selectors, icons are inserted to the LEFT of the matched element.
var VFA_DOCS_SELECTOR = {
    '.pcr-section-chief-complaint': { text: 'Document the patient\'s chief complaint as a direct quotation using the patient\'s exact words (e.g. "my leg hurts!"). If multiple complaints, document the most severe. If non-verbal: "Pt. Non-Verbal S/P [condition]".', inside: true },
    '.pcr-section-present-illness': { text: 'Begin with: "EMS requested to [location] for the [BLS/ALS] criteria call for the report of [complaint], responded immediately." Include full SAMPLE history, OPQRST assessment, and pertinent positives/negatives. Attribute all information to its source (e.g. "pt. states...", "family states...").', inside: true },
    '.pcr-section-scene-description': { text: 'Describe how the patient was found, what other agencies were on scene prior to arrival, and what care those agencies were providing upon your arrival.', inside: true },
    '.pcr-section-patient-movement': { text: 'Document how the patient was moved to the vehicle, their position in the vehicle, and how they were moved from the vehicle.', inside: true },
    '.pcr-section-header-minor|Breath Sounds': { text: 'Required — do not leave blank. Document breath sounds for both left and right lung fields on initial contact.', before: false },
    '.pcr-section-header|Cardiovascular': { text: 'Document pulse quality for each assessed location — Carotid (L/R), Radial (L/R), Brachial (L/R), Femoral (L/R). Select "NOT CHECKED" for any not assessed. Document any other pertinent cardiovascular findings in the comments field.', inside: true },
    '.pcr-section-header|Patient Belongings': { text: 'Document any belongings transported with the patient and to whom they were turned over on arrival at the receiving facility (e.g. "cut clothes under patient, motorcycle helmet TOT Dr. Smith and staff at receiving facility").', inside: true },
    '.lblclass|Comments': { text: 'Activity Log — document all assessment and treatment actions with timestamps. Required entries: Pt. Contact (first line, comment "Pt. contact – Vitals are PTOA"), all vital sign sets, IV attempts (location, catheter size, fluid amount, reason for failure if applicable), intubation attempts (tube size, blade size, cord visibility, confirmation method, securing method), cardiac monitor rhythms (initial 4 and 12 lead), medications (dose, rate, lot number for narcotics), medical control contacts (hospital, physician name, orders requested/received/denied), and Pt. Turnover (last line, comment "Pt. turnover – Vitals by receiving facility", provider assuming care, room number).', before: false }
};
