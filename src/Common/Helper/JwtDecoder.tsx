export default function jwt_decode(input: string) {
    if (input !== null) {
      var parts = input.split('.'); // header, payload, signature
      return JSON.parse(atob(parts[1]));
    } else {
      return null
    }
  }