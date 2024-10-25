import type Elysia from "elysia";
import DistrictService from "../services/district/District.service"; // Import DistrictService

const setAllDistrictRoutes = (elysia: Elysia) => {
  elysia
    .get("/districts", () => DistrictService.getAllDistricts()) // Get all districts
    .get(
      "/districts/:id",
      ({ params: { id } }) => DistrictService.getDistrictById(id) // Get district by ID
    )
    .get(
      "/districts/:id/municipality",
      ({ params: { id } }) => DistrictService.getMunicipalityByDistrictId(id) // Get municipalities in a district
    )
    .get(
      "/districts/:id/wards",
      ({ params: { id } }) => DistrictService.getWardByDistrictId(id) // Get wards by district ID
    )
    .get("/districts/count", () => DistrictService.getDistrictcount()) // Get district count
    .get("/districts/count-by-province", () =>
      DistrictService.getDistrictCountByProvince()
    ) // Get count of districts by province
    .get("/districts/count-by-municipality", () =>
      DistrictService.getMunicipalityCountByDistrict()
    ) // Get count of municipalities by district
    .get("/wards/count-by-district", () =>
      DistrictService.getWardCountByDistrict()
    ) // Get count of wards by district
    .get("/municipalities/count-by-province", () =>
      DistrictService.getMunicipalityCountByProvince()
    ) // Get count of municipalities by province
    .get("/wards/count-by-province", () =>
      DistrictService.getWardCountByProvince()
    ); // Get count of wards by province
};

export default setAllDistrictRoutes;
