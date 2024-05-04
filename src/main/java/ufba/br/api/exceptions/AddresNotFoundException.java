package ufba.br.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class AddresNotFoundException extends RuntimeException {
    public AddresNotFoundException() {
        super("Address not found");
    }
}