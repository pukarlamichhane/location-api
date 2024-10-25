import dbConnection from "../../config/db.config"; // Import the database connection

class DistrictService {
  private db;

  constructor() {
    this.db = dbConnection; // Initialize the database connection
  }

  getAllDistricts() {
    const data = this.db.query("SELECT * FROM district;").all();
    console.log(data);
    return data;
  }

  getDistrictById(id: string) {
    const data = this.db.prepare("SELECT * FROM district WHERE id = ?").get(id);
    console.log(data);
    return data;
  }

  getMunicipalityByDistrictId(id: string) {
    const data = this.db
      .prepare(
        `SELECT *
         FROM municipality
         JOIN district ON municipality.districtid = district.id WHERE district.id = ?`
      )
      .all(id);
    console.log(data);
    return data;
  }

  getWardByDistrictId(id: string) {
    const data = this.db
      .prepare(
        `SELECT 
          ward.*, 
          municipality.*, 
          district.*
          FROM 
              ward
          JOIN 
              municipality 
          ON 
              ward.municipality_id = municipality.id
          JOIN 
              district 
          ON 
          municipality.districtid = district.id
          WHERE
              district.id = ?
          `
      )
      .all(id);
    console.log(data);
    return data;
  }

  getDistrictcount() {
    const data = this.db
      .prepare(`SELECT COUNT(*) AS district_count FROM district`)
      .get(); // Execute the query
    return data;
  }

  getDistrictCountByProvince() {
    const data = this.db
      .prepare(
        `SELECT province.province_title, COUNT(district.id) AS district_count
       FROM district
       JOIN province ON district.provinceid = province.id
       GROUP BY province.province_title`
      )
      .all(); // Execute the query
    return data;
  }

  getMunicipalityCountByDistrict() {
    const data = this.db
      .prepare(
        `SELECT district.district_title, COUNT(municipality.id) AS municipality_count
       FROM municipality
       JOIN district ON municipality.districtid = district.id
       GROUP BY district.district_title`
      )
      .all(); // Execute the query
    return data;
  }

  getWardCountByMunicipality() {
    const data = this.db
      .prepare(
        `SELECT municipality.municipality_title, COUNT(wards.id) AS ward_count
       FROM wards
       JOIN municipality ON wards.municipality_id = municipality.id
       GROUP BY municipality.municipality_title`
      )
      .all(); // Execute the query
    return data;
  }

  getWardCountByDistrict() {
    const data = this.db
      .prepare(
        `SELECT district.district_title, COUNT(wards.id) AS ward_count
       FROM wards
       JOIN municipality ON wards.municipality_id = municipality.id
       JOIN district ON municipality.districtid = district.id
       GROUP BY district.district_title`
      )
      .all(); // Execute the query
    return data;
  }

  getMunicipalityCountByProvince() {
    const data = this.db
      .prepare(
        `SELECT province.province_title, COUNT(municipality.id) AS municipality_count
       FROM municipality
       JOIN district ON municipality.districtid = district.id
       JOIN province ON district.provinceid = province.id
       GROUP BY province.province_title`
      )
      .all(); // Execute the query
    return data;
  }

  // Get the count of wards by province
  getWardCountByProvince() {
    const data = this.db
      .prepare(
        `SELECT province.province_title, COUNT(wards.id) AS ward_count
       FROM wards
       JOIN municipality ON wards.municipality_id = municipality.id
       JOIN district ON municipality.districtid = district.id
       JOIN province ON district.provinceid = province.id
       GROUP BY province.province_title`
      )
      .all(); // Execute the query
    return data;
  }
}

export default new DistrictService(); // Export an instance of DistrictService
