import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "2x4s5032", // Get from Sanity dashboard
  dataset: "production", // Use the dataset you selected
  useCdn: false, // Set to false for fresh data
  apiVersion: "2023-01-01", // Use a recent API version
});
