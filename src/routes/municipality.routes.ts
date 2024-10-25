import type Elysia from "elysia";
import MunicipalityService from "../services/municipality/Municipality.service";

const setAllMunicipalityRoutes = (elysia: Elysia) => {
  elysia
    .get("/municipalities", () => MunicipalityService.getAllMunicipalities())
    .get("/municipalities/:id", ({ params: { id } }) =>
      MunicipalityService.getMunicipalityById(id)
    )
    .get("/municipalities/:id/wards", ({ params: { id } }) =>
      MunicipalityService.getWardByMunicipalityId(id)
    )
    .get("/municipalities/count", () =>
      MunicipalityService.getMunicipalitycount()
    ) // Corrected the endpoint

    .get("/municipalities/count-by-ward", () =>
      MunicipalityService.getWardCountByMunicipality()
    ); // Get count of wards by municipality
};

export default setAllMunicipalityRoutes;
