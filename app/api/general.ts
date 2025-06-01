// pages/index.js or inside a useEffect or server-side function


// export const ImageLink = `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/`

// export async function getServerSideProps(lang: string, endpoint: string) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${endpoint}`, {
//     method: 'GET',
//     headers: {
//       'accept': 'application-json',
//       'Content-Language': lang,
//     },
//   });

//   const data = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// }



// export async function getReviews() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reviews`, {
//     method: 'GET',
//     headers: {
//       'accept': 'application-json',
//     },
//   });

//   const data = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// }

// // You can adjust the URL if you're calling an external API
// export async function loginUser({ email, password }: { email: string; password: string }) {
//   try {
//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       body: JSON.stringify({ email, password }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (!res.ok) return false;

//     const data = await res.json();
//     localStorage.setItem("token", data.jwt); // or set cookie
//     return true;
//   } catch (err) {
//     console.error(err);
//     return false;
//   }
// }


// export async function GetSEO(lang:string,endpoint: string) {

//    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seo/${endpoint}`, {
//     method: 'GET',
//     headers: {
//       'accept': 'application-json',
//       'Content-Language': lang,
//     },
//   });

//   const data = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// }