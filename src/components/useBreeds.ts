import { useQuery } from "@tanstack/react-query";

export const useBreeds = () => {
  return useQuery({
   queryKey: ["breeds"],
   queryFn: async () => {
     const response = await fetch("https://dog.ceo/api/breeds/list/all");
     const data = await response.json();
     const breedsObj = data.message;
     const breeds = [];
     const mainBreeds = Object.keys(breedsObj);

     function cap(s: string) {
       return s.charAt(0).toUpperCase() + s.slice(1);
     }

     for (let i = 0; i < mainBreeds.length; i++) {
       const breedName = mainBreeds[i];
       if (breedsObj[breedName].length === 0) {
         breeds.push(cap(breedName));
       } else {
         for (let j = 0; j < breedsObj[breedName].length; j++) {
           breeds.push(cap(breedsObj[breedName][j]) + " " + cap(breedName));
         }
       }
     }
     return breeds;
   },
 });

}