-- Faq
CREATE TABLE FAQ (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  createDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO FAQ (question, answer) VALUES
("Laptop vs. Tablet: Which is Right for You?",
"Here’s how laptops and tablets compare in terms of raw computing performance and the different ways each device is used for business, personal use, and so on.
Performance of laptops and tablets. here’s how laptops and tablets stack up in terms of the most important performance factors:
Laptop vs. Tablet: Processor Ultrathin tablets don't have internal fans found in laptops, and rely on different, lower-performing processors that generate less heat and use less battery power. Tablet CPUs are still highly capable, just less so than most laptops. Advantage: Laptop.
Laptop vs. Tablet: Operating System The earliest tablets relied exclusively on mobile operating systems, similar to those that power smartphones. But today, you can buy tablets that run on essentially the same, full-fledged PC operating systems like Microsoft Windows 10. Advantage: None.
Laptop vs. Tablet: Portability Thin, ultralight tablets are, by definition, more portable than laptops, which have thicker superstructures, heavier batteries, and so on. Sure, a laptop can fit in a carrying case "),
("What Is a Hybrid Laptop?",
"A hybrid laptop is one that can be used as either a laptop or a standalone tablet. Its changeable, hybrid design is intended to offer something for everyone:
For laptop users: A touch screen and other tablet-style conveniences
For tablet users: A PC operating system, keyboard, and other features of a laptop
Hybrids -- also called 2-in-1s or, somewhat mistakenly, convertible laptops (see below) -- are more powerful than tablets yet have more portable functionality than traditional laptops. As a tablet, they offer the same innovative touch screen capabilities users of those devices have come to love. As a laptop, they provide the processing power, keyboard and other features of a more advanced PC."),
("Who should consider SSDs?", "SSD-storage-based laptops offer low storage capacity, but they offer 5x the performance benefits in comparison to standard HDD based storage. Consider SSDs when:
 - Working with large files (>1GB), - Want a laptop that boots up quickly, - Don't need a lot of storage space, - Looking for a pure performance laptop"),
("What about touchscreen?","Touchscreens make computer interfaces simpler. Just as you would on a smartphone, you can tap to select, hold and drag to move items, swipe to scroll and pinch to zoom.
This feature is currently available on a few Windows laptops and on a few Chromebooks."),
("How many RAM memory should I have", "The amount of RAM decides on how smooth and lag-free an experience you get on your laptop. The higher the amount of RAM the better it is. However, here’s an indication of what you can expect from laptops with varied RAM configurations.
We suggest a minimum of 4GB RAM for a lag free experience across daily used applications like office apps, browsing, video viewing, etc."),
("Laptop with Fingerprint reader?", "Fingerprint-based login is useful when laptop access and security is a concern.");

CREATE TABLE Brand (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brandName TEXT NOT NULL 
);

CREATE TABLE Laptop (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand INTEGER NOT NULL,
  name TEXT NOT NULL,
  display TEXT NOT NULL,
  processor TEXT NOT NULL,
  memory INTEGER NOT NULL,
  memory_type TEXT NOT NULL,
  graphics TEXT NOT NULL,
  storage INTEGER NOT NULL,
  storage_unit TEXT NOT NULL,
  imgUrl TEXT,
  price INTEGER,
  FOREIGN KEY(brand) REFERENCES Brand(id)
);

INSERT INTO Brand (brandName) VALUES 
("Lenovo"),
("Dell"),
("Asus"),
("HP"),
("Toshiba"),
("Acer"),
("Apple"),
("Fujitsu");

INSERT INTO Laptop (brand, name, display, processor, memory, memory_type, graphics, storage, storage_unit, imgUrl, price) 
VALUES 
(1, "ThinkPad X240", "12.5 inch", "i5-4300U 1.9 GHz", 4, "DDR3L-SDRAM", "Intel HD Graphics 4400", 500, "GB HDD", "/laptops/x240/", 500),
(1, "ThinkPad X390", "13.3 inch", "i7-8665U 1.9 GHz", 16, "DDR4-SDRAM", "Intel UHD Graphics 620", 256, "GB SSD", "/laptops/x390/", 2500),
(1, "ThinkPad X280", "12.5 inch", "i3-8130U 2.2 GHz", 4, "DDR4-SDRAM", "Intel UHD Graphics 620", 128, "GB SSD", "/laptops/x280/", 900),
(1, "ThinkPad X220", "12.5 inch", "i5-2540M 2.6 GHz", 4, "DDR3-SDRAM", "Intel HD Graphics 3000", 320, "GB HDD", "/laptops/x220/", 300),
(1, "ThinkPad X250", "12.5 inch", "i7-5600U 2.6 GHz", 8, "DDR3L-SDRAM", "Intel HD Graphics 5500", 500, "GB HDD", "/laptops/x250/", 600),
(1, "ThinkPad X260", "12.5 inch", "i5-6200U 2.3 GHz", 8, "DDR4-SDRAM", "Intel HD Graphics 520", 192, "GB SSD", "/laptops/x260/", 530),
(1, "ThinkPad T450", "14 inch", "i5-5200U 2.2 GHz", 4, "DDR3L-SDRAM", "Intel HD Graphics 5500", 500, "GB HDD", "/laptops/t450/", 750),
(1, "ThinkPad T480", "14 inch", "i5-8250U 1.60 GHz", 4, "DDR4-SDRAM", "Intel UHD Graphics 620", 500, "GB HDD", "/laptops/t480/", 2500),
(1, "ThinkPad T540p", "15.6 inch", "Intel Core i7(4700MQ) 2.4GHz", 16, "DDR3L", "Intel HD Graphics 4600", 256, "GB SSD", "/laptops/t540p/", 950),
(1, "ThinkPad T540p", "15.6 inch", "Intel Core i5 4200M @ 2.50GHz", 8, "DDR3", "Intel HD Graphics 4600", 128, "GB SSD", "/laptops/t540p/", 750),
(1, "ThinkPad L570 - 20J80027HV", "15.6 inch", "i5-7200U 2.50 GHz", 8, "DDR4-SDRAM", "Intel HD Graphics 620", 1000 , "GB HDD", "/laptops/l570/", 2430),
(1, "ThinkPad P51s - 20HB000VSP", "15.6 inch", "i7-7500U 2.70 GHz", 8, "DDR4-SDRAM", "NVIDIA Quadro M520M", 256  , "GB SSD", "/laptops/p51s/", 4000),
(6, "Aspire", "15,6 inch FullHD", "AMD A4-9120E 1,5GHz", 4, "DDR4", "AMD Radeon R3", 256, "GB SSD", "/laptops/aspire3", 700),
(4, "Notebook 255 G7 1L3P9EA", "15,6 inch FHD", "AMD Ryzen 3 3200U (2600 - 3500MHz)", 8, "DDR4", "AMD Radeon R3", 512, "GB SSD", "/laptops/notebook255G7", 1029)
;

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
DROP TABLE FAQ;
DROP TABLE Brand;
DROP TABLE Laptop;