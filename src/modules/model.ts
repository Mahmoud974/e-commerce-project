export enum Colors {
  Beige = "beige",
  Blue = "blue",
  Brown = "brown",
  Gray = "gray",
  Black = "black",
  Pink = "pink",
  GrayDark = "gray dark",
  Yellow = "yellow",
  Green = "green",
}
export enum Seats {
  Seat5 = 5,
  Seat1 = 1,
  Seat2 = 2,
  Seat6 = 6,
  Seat7 = 7,
  Seat3 = 3,
  Seat4 = 4,
  Seat8 = 8,
}

// Exemple d'utilisation
const selectedSeat: Seats = Seats.Seat5;
console.log(selectedSeat); // 5

// Exemple d'utilisation
const favoriteColor: Colors = Colors.Blue;
console.log(favoriteColor); // 'blue'
