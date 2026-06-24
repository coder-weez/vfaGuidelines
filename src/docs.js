// VFA field documentation standards.
// Each key matches the EMSCharts element name attribute.
// Add or update entries here to maintain org documentation standards.

var VFA_DOCS = {

    // ── Page 2 ────────────────────────────────────────────────────────────
    'PRMAIN_cc': 'Document the patient\'s chief complaint as a direct quotation using the patient\'s exact words (e.g. "my leg hurts!"). If multiple complaints, document the most severe. If non-verbal: "Pt. Non-Verbal S/P [condition]".',
    'PRMAIN_ccduration': 'Enter the numeric duration of the chief complaint.',
    'PRMAIN_ccdurunits': 'Select the unit of time that corresponds to the duration entered (e.g. Minutes, Hours, Days).',
    'PRMAIN_hpi': 'Begin with: "EMS requested to [location] for the [BLS/ALS] criteria call for the report of [complaint], responded immediately." Include full SAMPLE history, OPQRST assessment, and pertinent positives/negatives. Attribute all information to its source (e.g. "pt. states...", "family states...").',
    'scene_description': 'Describe how the patient was found, what other agencies were on scene prior to arrival, and what care those agencies were providing upon your arrival.',
    'PRMAIN_first_on_scene': 'Select the agency that was first on scene.',
    'PRMAIN_level_care_per_protocol': 'Select the level of care provided per protocol (BLS or ALS).',
    'PRMAIN_belongings': 'Document any belongings transported with the patient and to whom they were turned over on arrival at the receiving facility (e.g. "cut clothes under patient, motorcycle helmet TOT Dr. Smith and staff at receiving facility").',
    'stretcher_purpose_descr': 'Document the reason the patient was placed on the stretcher.',

    // ── Page 3 ────────────────────────────────────────────────────────────
    'stroke_scale': 'Document the results of the stroke scale exam (Cincinnati Stroke Scale). Any abnormal finding in any category indicates a positive screen.',
    'gcs_eye_1': 'Glasgow Coma Scale — Eye Opening. Score based on best response observed.',
    'gcs_verbal_1': 'Glasgow Coma Scale — Verbal Response. Score based on best response observed.',
    'gcs_motor_1': 'Glasgow Coma Scale — Motor Response. Score based on best response observed.',
    'pupil_size_l': 'Document left pupil size in millimetres.',
    'pupil_size_r': 'Document right pupil size in millimetres.',
    'pupil_rx_l': 'Document left pupil reactivity to light.',
    'pupil_rx_r': 'Document right pupil reactivity to light.',
    'head_reactive': 'Document any additional pupil or eye findings not captured by the structured size/reactivity fields.',
    'head_sensory': 'Document any additional sensory findings not captured by the structured extremity fields.',
    'motor_comments': 'Document any additional motor findings not captured by the structured extremity fields.',
    'motor_la': 'Motor function — Left Arm. Assess grip strength and movement quality.',
    'motor_ra': 'Motor function — Right Arm.',
    'motor_ll': 'Motor function — Left Leg.',
    'motor_rl': 'Motor function — Right Leg.',
    'sensory_la': 'Sensory function — Left Arm. Assess response to light touch.',
    'sensory_ra': 'Sensory function — Right Arm.',
    'sensory_ll': 'Sensory function — Left Leg.',
    'sensory_rl': 'Sensory function — Right Leg.',
    'AIR_STATUS': 'Required — do not leave blank. Select the descriptor that most accurately describes the airway condition on initial contact.',
    'AIR_COMMENTS': 'Document all pertinent airway findings on initial contact. If airway is not secured, document that here.',
    'air_by': 'Select the type of provider who performed the airway maneuver.',
    'air_outcome': 'Document the patient\'s response to airway maneuvers performed prior to arrival.',

    // ── Page 4 ────────────────────────────────────────────────────────────
    'RESP_COMMENTS': 'Document any other pertinent information about the patient\'s respiratory status or response to supplemental oxygen administration.',
    'cv_breath_sounds_l': 'Required — do not leave blank. Select descriptor for left lung breath sounds on initial contact.',
    'cv_breath_sounds_r': 'Required — do not leave blank. Select descriptor for right lung breath sounds on initial contact.',
    'cv_breath_comments': 'Document any additional findings pertinent to the patient\'s breath sounds.',
    'PULSE_CAROTID': 'Carotid pulse — Left. Select "NOT CHECKED" if not assessed.',
    'PULSE_CAROTID_R': 'Carotid pulse — Right. Select "NOT CHECKED" if not assessed.',
    'PULSE_RAD_L': 'Radial pulse — Left. Select "NOT CHECKED" if not assessed.',
    'PULSE_RAD_R': 'Radial pulse — Right. Select "NOT CHECKED" if not assessed.',
    'PULSE_BRA_L': 'Brachial pulse — Left. Select "NOT CHECKED" if not assessed.',
    'PULSE_BRA_R': 'Brachial pulse — Right. Select "NOT CHECKED" if not assessed.',
    'PULSE_FEM_L': 'Femoral pulse — Left. Select "NOT CHECKED" if not assessed.',
    'PULSE_FEM_R': 'Femoral pulse — Right. Select "NOT CHECKED" if not assessed.',
    'cv_comments': 'Document any other pertinent cardiovascular findings on initial contact.',

    // ── Page 8 ────────────────────────────────────────────────────────────
    'vs_comment': 'Activity Log — document all assessment and treatment actions with timestamps. Required entries: Pt. Contact (first line, comment "Pt. contact – Vitals are PTOA"), all vital sign sets, IV attempts (location, catheter size, fluid amount, reason for failure if applicable), intubation attempts (tube size, blade size, cord visibility, confirmation method, securing method), cardiac monitor rhythms (initial 4 and 12 lead), medications (dose, rate, lot number for narcotics), medical control contacts (hospital, physician name, orders requested/received/denied), and Pt. Turnover (last line, comment "Pt. turnover – Vitals by receiving facility", provider assuming care, room number).',

    // ── Page 5 ────────────────────────────────────────────────────────────
    'head_comments': 'Document: skull/facial/mandible deformity, dental damage, blood or CSF from ears/nose, periorbital ecchymosis, Battle\'s Sign, extraocular movements, sclera color, nostril flaring, fontanelle (infants), facial droop/slurred speech, respiratory effort, and any injuries.',
    'neck_comments': 'Document: neck vein condition, lymphadenopathy/masses, nuchal rigidity, accessory muscle use, subcutaneous air, and any injuries.',
    'trachea': 'Document tracheal position — midline, deviated left, or deviated right.',
    'chest_comments': 'Document: DCAP/BTLS findings, asymmetrical chest movement, crepitus on palpation, subcutaneous air, accessory muscle use or sternal/intracostal retractions, lung sounds bilaterally, adventitious breath sounds, and all injuries.',
    'ap_appearance': 'Document general abdominal appearance (round, flat, obese, distended, gravid, etc.).',
    'ap_palpation': 'Document: tenderness, rebound tenderness, guarding, rigidity, and presence/absence of masses.',
    'ap_bowel_sounds': 'Document presence/absence and quality of bowel sounds.',
    'ap_findings': 'Document: DCAP/BTLS abdominal findings, nausea/vomiting, and description of any injuries.',
    'pelvis_comments': 'Document: pelvic stability to lateral and A/P flexion, incontinence, blood at meatus, rectal bleeding, and femoral pulses.',
    'back_comments': 'If patient in SMR prior to arrival, document "PE of back deferred d/t pt. in SMR PTOA" and query placing providers for their findings. Otherwise document DCAP/BTLS for posterior thorax, flanks, and lumbar area, and describe any injuries.',
    'ex_comments': 'Document for all extremities: gross motor and sensory function, peripheral pulses, lack of use, deformity/angulation/discoloration/swelling, and wounds.',
    'ex_restraints': 'Document any restraints found on the patient during initial assessment.',
    'ex_skin_findings': 'Document: skin color and temperature, skin turgor, presence of petechia/purpura/surgical scars, and any injuries.'

};
