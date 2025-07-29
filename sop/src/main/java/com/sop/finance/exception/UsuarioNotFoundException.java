package com.sop.finance.exception;

public class UsuarioNotFoundException extends RuntimeException {
    
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UsuarioNotFoundException() {
        super();
    }

    public UsuarioNotFoundException(String message) {
        super(message);
    }
}
