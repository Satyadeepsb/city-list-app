package com.company.controllers;

import java.util.Optional;

import javax.validation.constraints.NotNull;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.company.entities.City;
import com.company.helpers.Path;
import com.company.services.CityService;

@RestController
public class CityController {
	
	private static final Logger logger = LoggerFactory.getLogger(CityController.class);

	@Autowired
	private CityService cityService;
	
	@CrossOrigin
	@GetMapping(Path.REST_CITIES)
	public ResponseEntity<Page<City>>getAllCities(@RequestParam(required = false) String name, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
		logger.info("Get paged cities " + name);
		Page<City> pageCities;
		Pageable pageable = PageRequest.of(page, size);
		if(null == name) {
			pageCities = cityService.getAllPagableCities(pageable);
		} else {
			pageCities = cityService.getAllPagableCitiesByName(name, pageable);
		}
		return ResponseEntity.ok(pageCities);
	}
	
	@GetMapping(Path.REST_CITIES + "/{id}")
	public ResponseEntity<?> getCityById(@PathVariable Long id) {
		logger.info("Get  city by id " + id);
		Optional<City> cityOp = cityService.getCityById(id);
		if(!cityOp.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.ok(cityOp.get());
	}
	
	@PreAuthorize("hasRole('ALLOW_EDIT')")
	@PutMapping(Path.REST_CITIES)
	public ResponseEntity<?> updateCity(@NotNull @RequestBody City city) {
		logger.info("updateCity ");
		Optional<City> cityOp =cityService.updateCity(city);
		if(!cityOp.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.ok(cityOp.get());
	}
}
