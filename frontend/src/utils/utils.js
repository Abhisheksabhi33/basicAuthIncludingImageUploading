import axios from "axios";

// Function to upload images to Cloudinary
export const uploadImageCloudinaryApiRequest = async (image) => {
  const url = "https://api.cloudinary.com/v1_1/jkhbnc-366gs/image/upload";
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "acsijtdn");

  alert("Uploading image...");

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Assuming the Cloudinary API returns the uploaded image URL
    const imageUrl = response.data.secure_url;

    alert("Image uploaded successfully:", imageUrl);

    // You can then send this URL to your backend without user ID
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};
export const getAuthTokenFromCookie = () => {
  // Retrieve all cookies
  const cookies = document.cookie.split(";");

  // Find the cookie with the name "authToken"
  const authTokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("access_token=")
  );

  // If the cookie is found, extract and resolve with the token
  if (authTokenCookie) {
    const authToken = authTokenCookie.split("=")[1];
    return authToken;
  }
  return null;
};
