export type Severity = "Low" | "Medium" | "High";

export type Incident = {
  id: number;
  title: string;
  description: string;
  severity: Severity;
  reported_at: string;
};

export const mockIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description:
      "Our job recommendation system showed 23% preference for male candidates in STEM fields, despite equal qualifications. Root cause analysis revealed training data contained historical hiring biases from tech companies between 2010-2020. The model amplified these patterns through its weighting system.",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z",
  },
  {
    id: 2,
    title: "LLM Hallucination in Medical Advice",
    description:
      "During clinical trials, our healthcare assistant LLM recommended incorrect insulin dosages for Type 2 diabetes patients in 12 out of 1,000 test cases. The errors stemmed from misinterpreting ambiguous patient descriptions and over-relying on outdated medical literature in its training corpus.",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z",
  },
  {
    id: 3,
    title: "Data Leak via API Response",
    description:
      "A misconfigured chatbot endpoint exposed user session IDs and browser metadata through HTTP headers for 48 hours. While no sensitive PII was leaked, the exposure violated our internal data governance policies and required notification to 3,200 affected users.",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z",
  },
  {
    id: 4,
    title: "Model Weights Security Breach",
    description:
      "An API vulnerability allowed authenticated users to download proprietary model weights by manipulating query parameters. The exploit was possible due to insufficient input sanitization in our inference service. The window of exposure was limited to 18 minutes before detection.",
    severity: "High",
    reported_at: "2025-02-28T16:45:00Z",
  },
  {
    id: 5,
    title: "Content Filter Bypass",
    description:
      "Users discovered specific prompt constructions that bypassed our NSFW filters by exploiting gaps in the safety classifier's training. The technique involved combining innocuous terms in uncommon syntactic patterns that weren't represented in our adversarial test cases.",
    severity: "Medium",
    reported_at: "2025-03-22T11:20:00Z",
  },
  {
    id: 6,
    title: "Geographic Data Imbalance",
    description:
      "Audit revealed 82% of our training data came from North America and Western Europe, leading to poor performance on queries involving cultural contexts from other regions. This caused our model to misinterpret local customs and social norms in 14% of global user interactions.",
    severity: "Low",
    reported_at: "2025-04-05T08:30:00Z",
  },
  {
    id: 7,
    title: "Prompt Injection Attack",
    description:
      "Malicious actors used specially crafted prompts to extract system instructions and partial training data snippets. The attack exploited our model's tendency to over-explain its reasoning process when given certain types of meta-queries about its operation.",
    severity: "High",
    reported_at: "2025-03-10T13:15:00Z",
  },
  {
    id: 8,
    title: "Session Data Retention",
    description:
      "User chat histories persisted in temporary cache 48 hours longer than our published data retention policy specified. The issue stemmed from an incorrect TTL setting in our Redis configuration that wasn't caught during deployment.",
    severity: "Medium",
    reported_at: "2025-03-18T14:00:00Z",
  },
  {
    id: 9,
    title: "Misdiagnosis Risk",
    description:
      "Our medical triage assistant suggested potentially dangerous treatment options for rare autoimmune conditions. The model lacked sufficient examples of these conditions in its training data, causing it to extrapolate incorrectly from more common illnesses.",
    severity: "High",
    reported_at: "2025-04-02T09:45:00Z",
  },
  {
    id: 10,
    title: "Dashboard Display Error",
    description:
      "Safety metrics visualization incorrectly displayed confidence intervals due to a frontend rounding error. The UI showed 95% confidence when actual values ranged between 89-97% for various metrics. Issue was purely visual and didn't affect backend calculations.",
    severity: "Low",
    reported_at: "2025-03-25T10:10:00Z",
  },
  {
    id: 11,
    title: "Cultural Sentiment Misclassification",
    description:
      "Content moderation system consistently flagged positive mentions of certain cultural practices as negative due to biased training examples. The model lacked context about nuanced cultural expressions, leading to 8% false positive rate in these cases.",
    severity: "Medium",
    reported_at: "2025-03-12T15:30:00Z",
  },
  {
    id: 12,
    title: "Rate Limit Exploit",
    description:
      "Attackers circumvented our safety query throttling system by distributing requests across multiple API keys. The exploit allowed 3x the permitted query volume for restricted topics before we implemented IP-based rate limiting alongside the existing key-based controls.",
    severity: "High",
    reported_at: "2025-03-05T12:00:00Z",
  },
  {
    id: 13,
    title: "Incomplete Model Documentation",
    description:
      "Version 2.3 of our safety classifier shipped without complete limitation documentation. Key sections about known edge cases and failure modes were omitted due to a publishing pipeline error. The missing documentation was restored within 4 hours of detection.",
    severity: "Low",
    reported_at: "2025-04-03T11:25:00Z",
  },
  {
    id: 14,
    title: "Voice Cloning Abuse",
    description:
      "Our voice synthesis API was used to create unauthorized celebrity voice replicas despite safeguards. Attackers used audio samples from interviews to fine-tune private models, bypassing our detection through gradual, incremental training.",
    severity: "Medium",
    reported_at: "2025-03-28T16:20:00Z",
  },
  {
    id: 15,
    title: "Training Data Contamination",
    description:
      "Benchmark evaluation data was accidentally included in our training corpus, leading to inflated performance metrics. The contamination affected 3 of 12 evaluation tasks, requiring retraining and re-evaluation of the affected models.",
    severity: "High",
    reported_at: "2025-02-25T09:00:00Z",
  },
  {
    id: 16,
    title: "Delayed Safety Flagging",
    description:
      "System took 11 minutes to detect and block harmful content generation due to queue processing delays during peak load. Normal response time is under 30 seconds. The incident revealed a bottleneck in our real-time monitoring infrastructure.",
    severity: "Medium",
    reported_at: "2025-03-30T14:15:00Z",
  },
  {
    id: 17,
    title: "Cookie Duration Mismatch",
    description:
      "Analytics cookies remained active for 14 days despite privacy policy stating 7-day maximum duration. The discrepancy resulted from conflicting configuration files between development and production environments.",
    severity: "Low",
    reported_at: "2025-04-06T10:40:00Z",
  },
  {
    id: 18,
    title: "False Safety Activation",
    description:
      "Gesture control system incorrectly triggered emergency shutdown during normal operation due to sensor miscalibration. The false positive rate increased to 1.2% after a firmware update that adjusted sensitivity thresholds.",
    severity: "Medium",
    reported_at: "2025-03-14T13:50:00Z",
  },
  {
    id: 19,
    title: "Unredacted Log Exposure",
    description:
      "Debug logs containing full user prompts were written to disk without proper anonymization. The logs included 2,481 user sessions before the issue was detected and corrected. No PII was exposed in this incident.",
    severity: "High",
    reported_at: "2025-03-08T17:30:00Z",
  },
  {
    id: 20,
    title: "Inconsistent Disclaimers",
    description:
      "AI-generated content displayed different warning labels across platforms due to inconsistent implementation of our disclosure standards. Some mobile clients showed abbreviated versions that omitted key limitations.",
    severity: "Low",
    reported_at: "2025-04-04T08:15:00Z",
  },
  {
    id: 21,
    title: "Clinical Decision Overreliance",
    description:
      "Healthcare providers using our system missed contradictory lab results because the UI emphasized AI suggestions over human input. The interface design was revised to better balance algorithmic and clinician judgment.",
    severity: "High",
    reported_at: "2025-03-17T11:10:00Z",
  },
  {
    id: 22,
    title: "Safety Label Mistranslation",
    description:
      "Critical disclaimers were incorrectly translated in 4 languages, potentially misleading non-English users about system capabilities. The errors stemmed from using automated translation without proper human review.",
    severity: "Low",
    reported_at: "2025-04-07T09:30:00Z",
  },
  {
    id: 23,
    title: "Feedback Loop Bias",
    description:
      "User engagement metrics unintentionally reinforced existing content biases by preferentially surfacing popular but narrow viewpoints. The algorithm lacked sufficient diversity preservation mechanisms.",
    severity: "Medium",
    reported_at: "2025-03-23T15:45:00Z",
  },
  {
    id: 24,
    title: "Model Performance Drift",
    description:
      "Safety classifier accuracy degraded by 11% over 6 months due to shifting input data distributions. The drift wasn't caught immediately because our monitoring focused on aggregate metrics rather than subgroup performance.",
    severity: "High",
    reported_at: "2025-03-03T10:20:00Z",
  },
  {
    id: 25,
    title: "Insufficient Legal Disclaimer",
    description:
      "System didn't adequately emphasize limitations when generating legal document templates, potentially creating false confidence in untested users. We strengthened visual prominence of disclaimers and added required confirmation steps.",
    severity: "Medium",
    reported_at: "2025-03-27T13:00:00Z",
  },
  {
    id: 26,
    title: "API Service Interruption",
    description:
      "Safety evaluation endpoints were unavailable for 41 minutes during infrastructure upgrades. The downtime exceeded our SLA commitment of 99.9% availability due to unexpected database migration complications.",
    severity: "Low",
    reported_at: "2025-04-08T14:30:00Z",
  },
  {
    id: 27,
    title: "Copyright Style Transfer",
    description:
      "Image generation system applied distinctive artistic styles without proper attribution or license verification. The issue affected styles from 23 living artists before we implemented a verified style registry.",
    severity: "Medium",
    reported_at: "2025-03-19T16:10:00Z",
  },
  {
    id: 28,
    title: "Remote Code Execution Flaw",
    description:
      "Critical vulnerability in model serving infrastructure allowed potential RCE through specially crafted inference requests. The security hole existed due to unsafe deserialization of input tensors in our preprocessing pipeline.",
    severity: "High",
    reported_at: "2025-02-27T08:45:00Z",
  },
  {
    id: 29,
    title: "Risk Rating Confusion",
    description:
      "Users frequently misinterpreted our 'moderate risk' classification as being less serious than intended. UX research revealed the color coding and iconography didn't properly communicate the potential severity.",
    severity: "Low",
    reported_at: "2025-04-09T10:50:00Z",
  },
  {
    id: 30,
    title: "Adversarial Testing Gap",
    description:
      "Red team evaluation missed an important prompt injection vector that was later exploited in production. The oversight occurred because testing focused on English-language attacks while this vulnerability used Unicode manipulations.",
    severity: "Medium",
    reported_at: "2025-03-16T12:15:00Z",
  },
  {
    id: 31,
    title: "Incomplete Data Deletion",
    description:
      "User data deletion requests weren't fully propagated to all backup systems due to a synchronization error. Approximately 3% of deletion requests required manual cleanup after the automated process completed.",
    severity: "High",
    reported_at: "2025-03-07T14:40:00Z",
  },
  {
    id: 32,
    title: "Documentation Version Error",
    description:
      "Safety whitepaper appendix contained version number inconsistencies that confused readers about model capabilities. The discrepancies resulted from incomplete merging of documentation updates across branches.",
    severity: "Low",
    reported_at: "2025-04-10T09:20:00Z",
  },
  {
    id: 33,
    title: "Overly Restrictive Filtering",
    description:
      "Safety system incorrectly blocked legitimate mental health support content due to overly broad keyword matching. The false positive rate reached 15% for certain therapeutic content before we refined the classification rules.",
    severity: "Medium",
    reported_at: "2025-03-24T11:35:00Z",
  },
  {
    id: 34,
    title: "Carbon Accounting Error",
    description:
      "Environmental impact calculations omitted cooling costs for our training infrastructure, underreporting energy use by 18%. The oversight was discovered during third-party sustainability auditing.",
    severity: "Low",
    reported_at: "2025-04-11T13:50:00Z",
  },
  {
    id: 35,
    title: "Debug Endpoints in Production",
    description:
      "Diagnostic API endpoints remained enabled in production, potentially exposing internal system state. The endpoints were accessible for 6 days before being discovered during a security review.",
    severity: "High",
    reported_at: "2025-03-09T15:05:00Z",
  },
  {
    id: 36,
    title: "Cultural Context Failure",
    description:
      "Content moderation mishandled regional humor and satire because the training data lacked sufficient examples of context-dependent meaning. This led to unnecessary censorship of culturally specific expressions.",
    severity: "Medium",
    reported_at: "2025-03-26T10:25:00Z",
  },
  {
    id: 37,
    title: "Temporary Monitoring Blindspot",
    description:
      "Safety-critical queries weren't logged during a 2-hour peak traffic period due to buffer overflow in our telemetry system. Approximately 12,000 queries weren't recorded before the issue was resolved.",
    severity: "Low",
    reported_at: "2025-04-12T14:15:00Z",
  },
  {
    id: 38,
    title: "Excessive Model Permissions",
    description:
      "Inference service had read access to sensitive internal databases beyond its requirements. The overprivileged configuration existed for 3 months before being discovered during access control review.",
    severity: "High",
    reported_at: "2025-03-11T16:30:00Z",
  },
  {
    id: 39,
    title: "Risk Threshold Ambiguity",
    description:
      "Different engineering teams implemented 'high risk' classification thresholds with 15% variation in stringency. The inconsistency resulted from unclear documentation about confidence score interpretation.",
    severity: "Medium",
    reported_at: "2025-03-29T09:40:00Z",
  },
  {
    id: 40,
    title: "Query Processing Delay",
    description:
      "Safety evaluation checks added 210ms latency during peak loads, exceeding our 150ms target. The bottleneck was traced to inefficient serialization in our content analysis pipeline.",
    severity: "Low",
    reported_at: "2025-04-13T11:55:00Z",
  },
  {
    id: 41,
    title: "Jailbreak Technique",
    description:
      "New attack method bypassed multiple safety layers by exploiting uncommon token combinations in the model's vocabulary. The technique worked by triggering rarely-used attention pathways in the architecture.",
    severity: "High",
    reported_at: "2025-03-13T13:10:00Z",
  },
  {
    id: 42,
    title: "Regulatory Conflict",
    description:
      "EU and US content requirements produced contradictory filtering rules, causing inconsistent behavior across regions. The conflict was most pronounced in areas like health information and political content.",
    severity: "Medium",
    reported_at: "2025-04-14T15:20:00Z",
  },
  {
    id: 43,
    title: "Incorrect Patch Reversion",
    description:
      "Critical safety update was accidentally rolled back during emergency hotfix deployment. The regression went undetected for 7 hours because monitoring alerts weren't properly configured for the specific vulnerability.",
    severity: "High",
    reported_at: "2025-03-21T10:45:00Z",
  },
  {
    id: 44,
    title: "Warning Label Typo",
    description:
      "Critical safety alert contained spelling errors in its heading that reduced perceived seriousness. The typo persisted for 3 days before being caught during a routine copy review.",
    severity: "Low",
    reported_at: "2025-04-15T12:00:00Z",
  },
  {
    id: 45,
    title: "Optimization Oversight",
    description:
      "Model fine-tuning for efficiency accidentally reduced safety margins by 22% on edge cases. The regression occurred because the optimization objective didn't sufficiently weight rare but critical failure modes.",
    severity: "Medium",
    reported_at: "2025-04-16T14:15:00Z",
  },
  {
    id: 46,
    title: "Training Data Licensing Issue",
    description:
      "Audit discovered 0.8% of dataset lacked proper redistribution rights, requiring removal and model retraining. The problematic data was concentrated in specialized academic domains.",
    severity: "Low",
    reported_at: "2025-03-31T16:30:00Z",
  },
  {
    id: 47,
    title: "Emergency Stop Failure",
    description:
      "Safety kill switch took 4.2 seconds to activate instead of the required 2-second maximum. The delay was caused by unanticipated queue buildup in the shutdown signal pathway.",
    severity: "High",
    reported_at: "2025-03-06T09:45:00Z",
  },
  {
    id: 48,
    title: "Probability Calibration Drift",
    description:
      "Confidence estimates varied by up to 19% for semantically identical queries phrased differently. The inconsistency stemmed from tokenization artifacts affecting the model's uncertainty quantification.",
    severity: "Medium",
    reported_at: "2025-04-17T11:00:00Z",
  },
  {
    id: 49,
    title: "Monitoring System Lag",
    description:
      "Real-time dashboard failed to update during failover event, showing stale safety metrics for 9 minutes. The delay created potential for operators to make decisions based on outdated information.",
    severity: "Low",
    reported_at: "2025-04-18T13:15:00Z",
  },
  {
    id: 50,
    title: "Unauthorized Model Fine-Tuning",
    description:
      "Research team conducted unapproved training runs using non-reviewed datasets on production models. The activity bypassed governance controls by using shadow infrastructure not covered by our normal monitoring.",
    severity: "High",
    reported_at: "2025-03-04T15:30:00Z",
  },
];
