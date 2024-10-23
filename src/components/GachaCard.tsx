import React from "react";
import { motion } from "framer-motion";
import { Character, Item } from "../types";
import { Star } from "lucide-react";
import { elementIcons } from "./elementIcons";
import { image } from "framer-motion/client";

interface GachaCardProps {
  item: Character | Item;
}

const GachaCard: React.FC<GachaCardProps> = ({ item }) => {
  const isCharacter = 'element' in item;

  // Define the base URL for the S3 bucket
  const S3_BUCKET_URL = "https://genshin-cards.s3.ap-southeast-1.amazonaws.com/";

  // Construct the image URL by checking if the item.image is a complete URL or just a filename
  const imageUrl = item.image.startsWith('http') ? item.image : `${S3_BUCKET_URL}${item.image}`;
  console.log(imageUrl)

  return (
    <motion.div
      className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-xl overflow-hidden max-w-xs transform transition-all duration-300 hover:scale-105"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white px-3 py-1 rounded-br-lg">
          {Array.from({ length: item.rarity }).map((_, index) => (
            <Star key={index} className="inline-block w-4 h-4 text-yellow-400" />
          ))}
        </div>
        {(item as any).isListed && (
          <div className="absolute bottom-0 left-0 bg-yellow-400 text-black px-2 py-1 rounded-tr-lg">
            Listed: {(item as any).price} ETH
          </div>
        )}
      </div>
      <div className="p-4 bg-white bg-opacity-90">
        <div className="bg-blue-100 rounded-lg p-3 mb-2">
          <h3 className="text-2xl font-bold text-blue-800 mb-1">{item.name}</h3>
          {isCharacter && (
            <div className="flex items-center justify-between">
              <p className="text-blue-600 flex items-center text-sm">
                <img
                  src={`./${elementIcons[item.element]}`}
                  alt={`${item.element} Icon`}
                  className="w-4 h-4 mr-1"
                />
                {item.element} Vision
              </p>
            </div>
          )}
        </div>
        {isCharacter && item.weapon && (
          <p className="text-gray-700 mt-2">Weapon: {item.weapon}</p>
        )}
        {isCharacter && item.faction && (
          <p className="text-gray-700">Faction: {item.faction}</p>
        )}
        {!isCharacter && (
          <p className="text-gray-700">Category: {item.category}</p>
        )}
      </div>
    </motion.div>
  );
};

export default GachaCard;