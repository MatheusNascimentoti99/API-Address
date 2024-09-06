package ufba.br.api.config;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import ufba.br.api.model.UserRole;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
  @Autowired
  private SecurityFilter securityFilter;

  @Bean
  SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http.csrf(csrf -> csrf.disable())
        .cors(cors -> cors.disable())
        .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(
            auth -> auth
                .requestMatchers("/auth").permitAll()
                .requestMatchers("/error").permitAll()
                .requestMatchers("/register").permitAll()
                .requestMatchers(HttpMethod.POST, "community/**").hasAnyRole(UserRole.ADMIN.name(), UserRole.USER.name())
                .requestMatchers(HttpMethod.PUT, "community/**").hasRole(UserRole.ADMIN.name())
                .requestMatchers(HttpMethod.DELETE, "community/**").hasRole(UserRole.ADMIN.name())
                .requestMatchers(HttpMethod.PATCH, "community/**").hasRole(UserRole.ADMIN.name())
                .anyRequest().authenticated()
        )
        .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
      return authenticationConfiguration.getAuthenticationManager();
  }
}