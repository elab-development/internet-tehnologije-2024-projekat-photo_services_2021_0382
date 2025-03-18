const usePicsum = (categoryName) => {
  const seed = categoryName
    ? categoryName.replace(/\s+/g, "-").toLowerCase()
    : "default";
  const imageUrl = `https://picsum.photos/seed/${seed}/600/400`;
  return imageUrl;
};

export default usePicsum;
