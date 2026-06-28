# Public form-service keys

Some third-party client-side form services, such as Web3Forms, intentionally use browser-exposed access keys that act more like public routing identifiers than secrets. Security review should focus on downstream abuse controls such as server-side spam filtering, captcha, domain restriction, and rate limiting rather than assuming every bundled `VITE_` key is a credential leak.
