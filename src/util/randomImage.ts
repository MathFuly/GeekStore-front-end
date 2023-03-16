export function randomImage() {
  const images = [
    "https://wallpapercrafter.com/desktop2/738843-Fate-Series-FateGrand-Order-Archer-FateGrand-Order.jpg",
    "https://www.gensh.in/wallpaper/genshin/genshin_30_4K.jpeg",
    "https://i.pinimg.com/originals/09/4c/15/094c157df77bd443417331d95974a67a.jpg",
    "https://for-virtuoverse.s3.amazonaws.com/upload/images/blogs/1676987427417_anime-la-gi-02.jpg",
    "https://images.hdqwalls.com/wallpapers/red-dead-redemption-2-4k-8d.jpg",
    "https://images8.alphacoders.com/107/1078901.jpg",
    "https://wallup.net/wp-content/uploads/2018/03/20/381036-Star_Wars.jpg",
    "https://pbs.twimg.com/media/FfwcRjrXgAY4qTh?format=jpg&name=4096x4096",
    "https://rare-gallery.com/mocahbig/394566-metroid-dread-game-samus-aran-4k-pc-wallpaper.jpg",
    "https://cdn.wallpapersafari.com/75/10/ZqDQwd.jpg",
    "https://a-static.besthdwallpaper.com/k-da-kai-sa-league-of-legends-lol-wallpaper-2560x2048-65782_33.jpg",
  ];

  const randomNumber = Math.floor(Math.random() * images.length);

  return images[randomNumber];
}
