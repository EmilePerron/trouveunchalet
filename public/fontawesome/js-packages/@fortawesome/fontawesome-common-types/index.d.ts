export type IconFamily = "classic" | "sharp" | "duotone";
export type IconPrefix = "fas" | "far" | "fal" | "fat" | "fad" | "fab" | "fak" | "fass" ;
export type CssStyleClass = "fa-solid" | "fa-regular" | "fa-light" | "fa-thin" | "fa-duotone" | "fa-brands" ;
export type IconStyle = "solid" | "regular" | "light" | "thin" | "duotone" | "brands" ;
export type IconPathData = string | string[]

export interface IconLookup {
  prefix: IconPrefix;
  // IconName is defined in the code that will be generated at build time and bundled with this file.
  iconName: IconName;
}

export interface IconDefinition extends IconLookup {
  icon: [
    number, // width
    number, // height
    string[], // ligatures
    string, // unicode
    IconPathData // svgPathData
  ];
}

export interface IconPack {
  [key: string]: IconDefinition;
}

export type IconName = 'trees' | 
  'bars' | 
  'navicon' | 
  'list' | 
  'list-squares' | 
  'campground' | 
  'tree' | 
  'users' | 
  'angle-right' | 
  'user' | 
  'star' | 
  'wifi' | 
  'wifi3' | 
  'wifi-strong' | 
  'map-location-dot' | 
  'map-marked-alt' | 
  'arrow-right' | 
  'house-water' | 
  'house-flood' | 
  'arrow-left' | 
  'arrow-left-long' | 
  'long-arrow-left' | 
  'gear' | 
  'cog' | 
  'ellipsis-vertical' | 
  'ellipsis-v' | 
  'house' | 
  'home' | 
  'home-alt' | 
  'home-lg-alt' | 
  'sun' | 
  'house-tree' | 
  'arrow-right-long' | 
  'long-arrow-right' | 
  'ellipsis' | 
  'ellipsis-h' | 
  'location-dot' | 
  'map-marker-alt' | 
  'magnifying-glass' | 
  'search' | 
  'plus' | 
  'add' | 
  'spinner' | 
  'gears' | 
  'cogs' | 
  'sun-bright' | 
  'sun-alt' | 
  'dog' | 
  'grid-2' | 
  'notdef' | 
  'trees' | 
  'bars' | 
  'navicon' | 
  'list' | 
  'list-squares' | 
  'campground' | 
  'tree' | 
  'users' | 
  'angle-right' | 
  'user' | 
  'star' | 
  'wifi' | 
  'wifi3' | 
  'wifi-strong' | 
  'map-location-dot' | 
  'map-marked-alt' | 
  'arrow-right' | 
  'house-water' | 
  'house-flood' | 
  'arrow-left' | 
  'arrow-left-long' | 
  'long-arrow-left' | 
  'gear' | 
  'cog' | 
  'ellipsis-vertical' | 
  'ellipsis-v' | 
  'house' | 
  'home' | 
  'home-alt' | 
  'home-lg-alt' | 
  'sun' | 
  'house-tree' | 
  'arrow-right-long' | 
  'long-arrow-right' | 
  'ellipsis' | 
  'ellipsis-h' | 
  'location-dot' | 
  'map-marker-alt' | 
  'magnifying-glass' | 
  'search' | 
  'plus' | 
  'add' | 
  'spinner' | 
  'gears' | 
  'cogs' | 
  'sun-bright' | 
  'sun-alt' | 
  'dog' | 
  'grid-2' | 
  'notdef' | 
  'trees' | 
  'bars' | 
  'navicon' | 
  'list' | 
  'list-squares' | 
  'campground' | 
  'tree' | 
  'users' | 
  'angle-right' | 
  'user' | 
  'star' | 
  'wifi' | 
  'wifi3' | 
  'wifi-strong' | 
  'map-location-dot' | 
  'map-marked-alt' | 
  'arrow-right' | 
  'house-water' | 
  'house-flood' | 
  'arrow-left' | 
  'arrow-left-long' | 
  'long-arrow-left' | 
  'gear' | 
  'cog' | 
  'ellipsis-vertical' | 
  'ellipsis-v' | 
  'house' | 
  'home' | 
  'home-alt' | 
  'home-lg-alt' | 
  'sun' | 
  'house-tree' | 
  'arrow-right-long' | 
  'long-arrow-right' | 
  'ellipsis' | 
  'ellipsis-h' | 
  'location-dot' | 
  'map-marker-alt' | 
  'magnifying-glass' | 
  'search' | 
  'plus' | 
  'add' | 
  'spinner' | 
  'gears' | 
  'cogs' | 
  'sun-bright' | 
  'sun-alt' | 
  'dog' | 
  'grid-2' | 
  'notdef';
