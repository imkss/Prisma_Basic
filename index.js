const express = require("express");
const app = express();
const{PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

app.use(express.json());

// Creating Endpoints
app.get("/user", async (req,res) => {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers);
});

app.get("/house", async (req,res) => {
    const allHouses = await prisma.house.findMany({
        include : {
            owner : true,
            builtby : true,
        },
    });
    res.json(allHouses);
});

// Creating one user details
app.post("/user/", async (req,res) => {
    const newUser = await prisma.user.create({data: req.body });
    res.json(newUser);
});

// Creating many users details
app.post("/users", async (req,res) => {
    const newUser = await prisma.user.createMany({data: req.body });
    res.json(newUser);
});

// Find user by ID
app.get("/user/:id", async (req,res) => {
    const id = req.params.id;
    const allUsers = await prisma.user.findUnique({
        where:{
            id
        },
    });
    res.json(allUsers);
});

// Updating user details
app.put("/user/:id", async (req,res) => {
    const id = req.params.id;
    const newAge = req.body.age;
    const updatedUser = await prisma.user.update({
        where:{id}, 
        data:{age: newAge}
    });
    res.json(updatedUser);
});

// Deleting user details
app.delete("/user/:id", async (req,res) => {
    const id = req.params.id;
    const deletedUser = await prisma.user.delete({
        where:{id}
    });
    res.json(deletedUser);
});

/*For House */
app.post("/house", async (req,res) => {
    const newHouse = await prisma.house.create({data: req.body });
    res.json(newHouse);
});
// Adding many houses
app.post("/house/many", async (req,res) => {
    const newHouse = await prisma.house.createMany({data: req.body });
    res.json(newHouse);
});

// Finding House by Id
app.get("/house/:id", async (req,res) => {
    const id = req.params.id;
    const allHouses = await prisma.house.findUnique({
        where:{
            id,
        },
        include : {
            owner : true,
            builtby : true,
        },
    });
    res.json(allHouses);
});

// Finding House by Address
app.get("/house", async (req,res) => {
    const address = req.body.address;
    const allHouses = await prisma.house.findUnique({
        where:{
            address,
        },
        include : {
            owner : true,
            builtby : true,
        },
    });
    res.json(allHouses);
});

// Filter on houses

app.get("/house/filters", async (req, res) => {
    const filteredHouses = await prisma.house.findMany({
        where:{
            wifiPassword :{
                not:null,
            },
            owner:{
                age: {
                    gte:22,
                },
            },
        },
        orderBy : [
            {
                owner:{
                    firstName:"desc",
                },
            },
        ],
        include:{
            owner :true,
            builtby : true,
        },
    });
    res.json(filteredHouses);
});

app.listen(3001, () => console.log(`Server running on port ${3001}`)); 