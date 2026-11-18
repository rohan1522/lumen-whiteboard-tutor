# 04 — Engineering considerations

There is no mandated technology stack, architecture, hosting provider, database, or AI vendor. Choose tools that fit your product and explain important decisions.

The following areas may be relevant depending on what you build. They are considerations, not compulsory implementation requirements.

## Architecture and code

- Keep the implementation understandable and organised for the scope you choose.
- Consider how the interface, application logic, persistence, and external services fit together.
- Handle failures and unexpected responses in a way that does not leave the learner confused.
- Avoid unnecessary complexity; explain meaningful trade-offs.

## AI integration

- Explain the role AI plays in the experience and why it is useful.
- Consider response quality, latency, cost, context management, and model limitations where relevant.
- Think about how the product handles uncertainty, incorrect answers, or unsuitable output.
- Make it possible for a reviewer to understand which behaviour is live and which is mocked or simulated.

## Learning interaction

Consider whether the interaction helps the learner understand, practise, or apply the concept. If your product generates visual or structured content, consider whether it remains clear and usable as the learner interacts with it.

## Privacy and security

- Never commit API keys, secrets, private tokens, or credentials.
- Use environment variables or an appropriate secret-management mechanism.
- Avoid collecting unnecessary personal information.
- Use synthetic or sample learner data unless you have appropriate permission to use real data.
- Consider access control and safe handling of user input where applicable.

## Accessibility and usability

Consider readable contrast, keyboard access, clear interaction states, responsive layouts, and understandable error messages where relevant to your design.

## Deployment and reliability

Provide a demo that reviewers can access. If the demo has limitations, requires a special setup, or may incur usage restrictions, explain them in the README. Include setup instructions so the project can be understood or run locally where practical.
