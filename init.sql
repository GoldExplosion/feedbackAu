CREATE TABLE basicInfo(
    ID serial primary key UNIQUE,
    Building varchar(50) ,
    Floor varchar(2) ,
    Name varchar(25) ,
    Phone VARCHAR(10),
    Type varchar(15),
    SubmitTime DATE NOT NULL
);

CREATE TABLE toiletForm(
    ID INT,
    Toilet VARCHAR(15),
    Cleanliness INT,
    Complaint VARCHAR(255),
    Flushworking VARCHAR(5),
    WashedRegularly VARCHAR(5),
    WaterLeakage VARCHAR(5),
    WaterSupply VARCHAR(5),
    CONSTRAINT fk_ID FOREIGN KEY(ID) REFERENCES basicInfo(ID)
);

CREATE TABLE foodForm(
    ID INT,
    Stall VARCHAR(15),
    Ambience INT,
    Cleanliness INT,
    Feedback VARCHAR(255),
    FoodQuality INT,
    FoodTaste INT,
    ServiceQuality INT,
    CONSTRAINT fk_ID FOREIGN KEY(ID) REFERENCES basicInfo(ID) 
);

CREATE TABLE securityForm(
    ID INT,
    Booth VARCHAR(30),
    SecurityAlertness INT,
    SecurityAvailability VARCHAR(3),
    SecurityAvailabilityReason VARCHAR(30),
    SecurityDrunk VARCHAR(3),
    SecurityMisbehaving VARCHAR(3),
    Feedback VARCHAR(255),
    CONSTRAINT fk_ID FOREIGN KEY(ID) REFERENCES basicInfo(ID)
);

CREATE TABLE housekeepingForm(
    ID INT,
    Room VARCHAR(15),
    Cleanliness INT,
    Feedback VARCHAR(255),
    RoomSwept VARCHAR(3),
    RoomMopped VARCHAR(3),
    RoomsNotMopped VARCHAR(90),
    RoomsNotSwept VARCHAR(90),
    Cobwebs VARCHAR(3),
    Windows VARCHAR(3),
    CONSTRAINT fk_ED FOREIGN KEY(ID) REFERENCES basicInfo(ID)
);