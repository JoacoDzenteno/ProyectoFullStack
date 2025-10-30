// En: config/SecurityConfig.java
package com.tiendadelcazador.tiendabackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationProvider authProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                // 1. Configuración de CORS (¡Crítico!)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                
                // 2. Deshabilitamos CSRF (para que funcionen los POST desde React)
                .csrf(csrf -> csrf.disable()) 
                
                // 3. Autorización de Rutas
                .authorizeHttpRequests(auth -> auth
                        

                        // --- ¡LÍNEAS NUEVAS PARA SWAGGER! ---
                        .requestMatchers("/swagger-ui.html").permitAll()
                        .requestMatchers("/swagger-ui/**").permitAll()
                        .requestMatchers("/v3/api-docs/**").permitAll()
                        // --- FIN LÍNEAS NUEVAS ---
                        
                        // --- RUTAS PÚBLICAS ---
                        .requestMatchers("/api/auth/**").permitAll() // Login y Registro
                        .requestMatchers(HttpMethod.GET, "/api/productos/**").permitAll() // Ver productos
                        .requestMatchers("/api/auth/**").permitAll() // Login y Registro
                        .requestMatchers(HttpMethod.GET, "/api/productos/**").permitAll() // Ver productos
                        
                        // --- RUTAS DE ADMIN ---
                        .requestMatchers("/api/admin/**").hasAuthority("ADMIN") 
                        
                        // --- OTRAS (ej. Carrito, Perfil de usuario) ---
                        .anyRequest().authenticated() // Todas las demás, requiere estar logueado
                )
                
                // 4. Configuración de Login
                .formLogin(form -> form.disable()) // Deshabilitamos el form login por defecto
                
                // 5. Configuración de Logout
                .logout(logout -> logout
                    .logoutUrl("/api/auth/logout") // URL para que el frontend llame
                    .logoutSuccessHandler((req, res, auth) -> res.setStatus(200)) // Devuelve OK 200
                    .deleteCookies("JSESSIONID") // Borra la cookie de sesión
                    .invalidateHttpSession(true)
                )
                
                // 6. Proveedor de Autenticación
                .authenticationProvider(authProvider)
                
                .build();
    }

    // --- BEAN DE CONFIGURACIÓN DE CORS ---
    // Esto "abre" la puerta para que React (en 5173) hable con Spring (en 8080)
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // El puerto de nuestro frontend
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        // Métodos que permitimos
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        // Cabeceras que permitimos
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        // ¡Crítico para que las Cookies de Sesión funcionen!
        configuration.setAllowCredentials(true); 
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Aplica a todas las rutas
        return source;
    }
}