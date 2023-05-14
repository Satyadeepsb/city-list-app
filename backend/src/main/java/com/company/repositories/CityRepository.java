package com.company.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.company.entities.City;

@Repository
public interface CityRepository extends JpaRepository<City, Long>{

}
