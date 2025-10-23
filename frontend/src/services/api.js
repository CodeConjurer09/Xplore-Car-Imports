const API_BASE_URL = "http://127.0.0.1:8000/api";


export const fetchCars = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/`);
    if (!response.ok) throw new Error("Failed to fetch cars");

    const data = await response.json();
    console.log("✅ Cars API Response:", data);

    // Support both paginated & non-paginated responses
    return Array.isArray(data) ? data : data.results || [];
  } catch (error) {
    console.error("❌ Error fetching cars:", error);
    return [];
  }
};

export async function fetchCarImages(carId) {
  try {
    const response = await fetch(`${API_BASE_URL}/car-images/?car=${carId}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`❌ Error fetching images for car ${carId}:`, error);
    return [];
  }
}


export async function submitEnquiry(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/enquiries/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to submit enquiry");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error submitting enquiry:", error);
    throw error;
  }
}


export async function submitCarEnquiry(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/car-enquiries/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to submit car enquiry");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error submitting car enquiry:", error);
    throw error;
  }
}