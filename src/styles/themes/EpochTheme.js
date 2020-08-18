export const epochTheme = {
  base00: '#0a090c', // background
  base01: 'red',
  base02: 'hsl(0, 0%, 35%)', // highligher and expander verticals
  base03: 'blue',
  base04: 'purple',
  base05: 'hsl(0, 100%, 75%)', // undefined
  base06: 'orange',
  base07: 'white', // 'rgb(155, 187, 220)', // key names
  base08: 'white',
  base09: 'rgb(155, 187, 220)', // strings
  base0A: 'hsl(0, 100%, 75%)', // null
  base0B: 'green',
  base0C: 'white', // array indexes rgb(93, 176, 215)
  base0D: 'rgb(231, 194, 112)', // expanders rgb(242, 151, 102)
  base0E: '#c678dd', // boolean values
  base0F: 'rgb(53, 212, 199)', // numbers
};

/*
CAN ALSO DO A THEME THIS WAY

theme={{
  base00: "white", 
  base01: "#ddd",
  base02: "#ddd",
  base03: "#444",
  base04: "purple",
  base05: "#444",
  base06: "#444",
  base07: "#444",
  base08: "#444",
  base09: "rgba(70, 70, 230, 1)",
  base0A: "rgba(70, 70, 230, 1)",
  base0B: "rgba(70, 70, 230, 1)",
  base0C: "rgba(70, 70, 230, 1)",
  base0D: "rgba(70, 70, 230, 1)",
  base0E: "rgba(70, 70, 230, 1)",
  base0F: "rgba(70, 70, 230, 1)"
}}

base00 - Default Background
base01 - Lighter Background (Used for status bars)
base02 - Selection Background
base03 - Comments, Invisibles, Line Highlighting
base04 - Dark Foreground (Used for status bars)
base05 - Default Foreground, Caret, Delimiters, Operators
base06 - Light Foreground (Not often used)
base07 - Light Background (Not often used)
base08 - Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
base09 - Integers, Boolean, Constants, XML Attributes, Markup Link Url
base0A - Classes, Markup Bold, Search Text Background
base0B - Strings, Inherited Class, Markup Code, Diff Inserted
base0C - Support, Regular Expressions, Escape Characters, Markup Quotes
base0D - Functions, Methods, Attribute IDs, Headings
base0E - Keywords, Storage, Selector, Markup Italic, Diff Changed
base0F - Deprecated, Opening/Closing Embedded Language Tags, e.g. <?php ?>

*/
