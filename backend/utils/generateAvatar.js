export default function getAvatarUrl(name) {
    const randomSeed = name + Math.floor(Math.random() * 1000); // Unique seed
    return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(randomSeed)}`;
  }
  