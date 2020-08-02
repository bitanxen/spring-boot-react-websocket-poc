package in.bitanxen.app.config.security;

import in.bitanxen.app.service.AuthenticationService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

import static java.util.Optional.ofNullable;
import static org.apache.commons.lang3.StringUtils.removeStart;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

public class TokenAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private static final String BEARER = "Bearer";
    private final AuthenticationService authenticationService;

    public TokenAuthenticationFilter(RequestMatcher requiresAuth, AuthenticationService authenticationService) {
        super(requiresAuth);
        this.setAllowSessionCreation(false);
        this.authenticationService = authenticationService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String authorizationHeader = ofNullable(request.getHeader(AUTHORIZATION)).orElse(request.getParameter("token"));
        String token = ofNullable(authorizationHeader)
                .map(value -> removeStart(value, BEARER))
                .map(String::trim)
                .orElseThrow(() -> new BadCredentialsException("Missing Authentication Token"));
        SessionUser user = authenticationService.validateToken(token);
        return new UsernamePasswordAuthenticationToken(user, token, new ArrayList<>());
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        super.successfulAuthentication(request, response, chain, authResult);
        chain.doFilter(request, response);
    }



}