package ru.itis.longpolling.controller;

import org.modelmapper.ModelMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.itis.longpolling.dto.LoginDto;
import ru.itis.longpolling.dto.RegisterDto;
import ru.itis.longpolling.model.User;
import ru.itis.longpolling.service.UserService;

import javax.servlet.http.HttpServletRequest;

@RestController
public class UserController {

  private final UserService userService;

  private final ModelMapper modelMapper;

  public UserController(UserService userService, ModelMapper modelMapper) {
    this.userService = userService;
    this.modelMapper = modelMapper;
  }

  @PostMapping("/login")
  public String login(@RequestBody LoginDto loginDto) {
    return userService.signin(loginDto.getLogin(), loginDto.getPassword());
  }

  @PostMapping("/register")
  public String signup(@RequestBody RegisterDto user) {
    return userService.signup(modelMapper.map(user, User.class));
  }

  @DeleteMapping(value = "/{username}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public String delete(@PathVariable String username) {
    userService.delete(username);
    return username;
  }

  @GetMapping("/refresh")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
  public String refresh(HttpServletRequest req) {
    return userService.refresh(req.getRemoteUser());
  }

}