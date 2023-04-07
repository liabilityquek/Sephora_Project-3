const makeupArtist = require("../controllers/makeupAdminController");
const express = require("express");
const router = express.Router();


router.get("/edit/:id", makeupArtist.show)
router.post("/", makeupArtist.create);
router.get("/:locationId", makeupArtist.findMakeupArtistByLocation);
router.get("/admin/:makeupArtistId", makeupArtist.findAppointmentByMakeupArtistId);
router.put("/:makeupArtistId", makeupArtist.updateMakeupArtist);
router.delete("/:id", makeupArtist.deleteMakeupArtist)



module.exports = router;
