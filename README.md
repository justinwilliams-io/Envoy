# Envoy

Envoy is a request managment library that wraps the fetch API and includes features like request Queueing, retry policies, and profiling. I am building Envoy to also be usable as a drop in replacement for Axios.
This project is still very much in development, and is not yet to parity with Axios, but does encapsulate the main functionality of every request type (including custom HTTP methods). Request queueing is also ready.

I have not published this package anywhere yet.

## Roadmap
- Test queue logic
- Get to parity with Axios
- Add retry logic with built in policies
  - Exponential backoff
  - Support for custom retry policies
- Add profiling capability

## License

This project is licensed under the [MIT](LICENSE.md)
