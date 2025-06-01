
export async function fetchServer(pageURL: string,lang:string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${pageURL}?locale=${lang}`,
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch Props");
    }
  
    const json = await res.json();
  
    return { data: json.data }; // Ensure the returned data matches the expected type
  }
  
  export async function fetchSEO(pageURL: string,lang:string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${pageURL}?populate[Seo][populate]=*&locale=${lang}`,
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch Props");
    }
  
    const json = await res.json();
  
    return { data: json.data }; // Ensure the returned data matches the expected type
  }
  