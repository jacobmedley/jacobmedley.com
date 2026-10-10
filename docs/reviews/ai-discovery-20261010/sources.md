# AI discovery revision: source review

Reviewed October 10, 2026. B101 supersedes B99/B100 where Jacob corrected the story. Sources establish external findings and design explorations; they do not verify this project’s outcomes or the date Jacob read an individual article.

## Project account

- Early 2023 start; XD/UX discovery and research for one assistant, with a public chat and an internal service workspace.
- Scattered PDFs, images, presentations, Word documents, scans, and staff knowledge. An account-balance test returned 150,000 from a sample statement; the required response was referral to an account representative.
- Usability testing and QA: approximately 15 seconds average and up to 60 seconds; measured from user action toward the API, then API request and internal steps. Backend optimization brought the reported average to roughly 8–10 seconds. No retained sample size, test dates or raw log is claimed.
- Streaming was enabled. Jacob explicitly corrected the earlier absence claim: implementing it on the adopted platform took substantial technical work. No attribution of the latency change to streaming alone.
- MoSCoW priorities follow Jacob’s account. The “Won’t have in this demo” card is a reconstruction boundary, not an invented historical scope decision.
- Future concepts and original project delivery are distinguished. Only the conclusion discusses launch gaps and adoption. No colleague names or blame.

## Research papers

Read the original papers, including the relevant methods, findings and limitations. The linked support paper is pinned to its April 2023 version, rather than a later revision with a different sample.

### Generative AI at Work

- Authors: Erik Brynjolfsson, Danielle Li, and Lindsey R. Raymond
- Version: April 2023; 2023 working paper, pp. 2, 8–12, 22
- Source: https://arxiv.org/pdf/2304.11771v1
- Quotation: “who remain responsible for the conversation and are free to ignore its suggestions”
- A staggered rollout across 5,179 support agents found larger productivity gains for newer and lower-skilled workers. The tool offered replies and relevant documentation beside the conversation.
- Design implication: put the reference and editable draft beside the task, with the representative in control.
- Limit: A study of one software-support setting, not a forecast for this project.

### Experimental Evidence on the Productivity Effects of Generative Artificial Intelligence

- Authors: Shakked Noy and Whitney Zhang
- Version: March 2023; March 2 working paper, abstract and sections 2.1–2.4
- Source: https://economics.mit.edu/sites/default/files/inline-files/Noy_Zhang_1.pdf
- Quotation: “restructures tasks towards idea-generation and editing and away from rough-drafting”
- The experiment assigned professional writing tasks to 444 participants. It found shorter task times and higher rated output with ChatGPT.
- Design implication: make editing and checking a draft part of the workflow.
- Limit: Bounded writing tasks do not establish safe answers to account questions.

### The Impact of AI on Developer Productivity: Evidence from GitHub Copilot

- Authors: Sida Peng, Eirini Kalliamvakou, Peter Cihon, and Mert Demirer
- Version: February 2023; 2023 paper, Study Design and Discussion
- Source: https://arxiv.org/pdf/2302.06590
- Quotation: “this study does not examine the effects of AI on code quality”
- A controlled experiment gave developers a single programming task and measured completion and time.
- Design implication: measure speed and quality separately. A faster answer can still be wrong.
- Limit: The authors caution that benefits may vary across tasks.

The support study is the closest match to the requested “sales chatbot” reference: it concerns customer-support agents. It used a staggered rollout after a pilot, not a randomized rollout across the full workforce. The writing paper is the March working paper (444 participants), not the later published version (453). The Copilot experiment was one programming task and did not measure code quality. No study’s productivity percentage is presented as this project’s result.

## Article dates

| Article | Published | Author |
| --- | --- | --- |
| [AI: First New UI Paradigm in 60 Years](https://www.nngroup.com/articles/ai-paradigm/) | June 18, 2023 | Jakob Nielsen, NN/g |
| [AI Improves Employee Productivity by 66%](https://www.nngroup.com/articles/ai-tools-productivity-gains/) | July 16, 2023 | Jakob Nielsen, NN/g |
| [AI Tools Raise the Productivity of Customer-Support Agents](https://www.nngroup.com/articles/ai-productivity-customer-support/) | July 16, 2023 | Jakob Nielsen, NN/g |
| [ChatGPT Lifts Business Professionals’ Productivity and Improves Work Quality](https://www.nngroup.com/articles/chatgpt-productivity/) | April 2, 2023 | Jakob Nielsen, NN/g |
| [New Ways into Web Content](https://www.lukew.com/ff/2008/ask-lukew-new-ways-into-web-content) | April 10, 2023 | Luke Wroblewski |
| [Integrated Audio Experiences & Memory](https://www.lukew.com/ff/2017/ask-lukew-integrated-audio-experiences-memory) | May 9, 2023 | Luke Wroblewski |
| [Expanding Conversational User Interfaces](https://www.lukew.com/ff/2018/expanding-conversational-user-interfaces) | May 15, 2023 | Luke Wroblewski |
| [Integrated Video Experiences](https://www.lukew.com/ff/2021/ask-lukew-integrated-video-experiences) | May 24, 2023 | Luke Wroblewski |
| [Integrated PDF Experiences](https://www.lukew.com/ff/2029/ask-lukew-integrated-pdf-experiences) | July 27, 2023 | Luke Wroblewski |
| [Dynamic Preview Cards](https://www.lukew.com/ff/2067/ask-lukew-dynamic-preview-cards) | May 31, 2024 | Luke Wroblewski |
| [Text Generation Differences](https://www.lukew.com/ff/2068/ask-lukew-text-generation-differences) | June 21, 2024 | Luke Wroblewski |
| [PDF Parsing with Vision Models](https://www.lukew.com/ff/2069/ask-lukew-pdf-parsing-with-vision-models) | June 26, 2024 | Luke Wroblewski |
| [Streaming Citations](https://www.lukew.com/ff/2077/ask-lukew-streaming-citations) | September 18, 2024 | Luke Wroblewski |
| [Streaming Inline Images](https://www.lukew.com/ff/2079/ask-lukew-streaming-inline-images) | October 1, 2024 | Luke Wroblewski |

Excluded after reading the supplied pages: [Custom Re-ranker](https://www.lukew.com/ff/2086/ask-lukew-custom-re-ranker), February 10, 2025; [Conversational AI Usability Study](https://www.lukew.com/ff/2087/ask-lukew-conversational-ai-usability-study), February 17, 2025. The 2025 study also describes January 2025 sessions. Neither meets the 2023–2024 publication constraint.

## Reconstruction materials

Both PDFs and their preview images were authored for this concept from the registered sample content. They contain no real customer, account, company policy or original internal document. The PDF guide’s steps and form’s labels are illustrative. All controls are local frontend interactions; there is no AI, Salesforce, document service or customer connection.
