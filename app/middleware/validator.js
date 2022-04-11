const validator = (schema, dataOrigin) => {
    const myMw = (request, response, next) => {
    // validate sur le request.body
        const { error } = schema.validate(request[dataOrigin]);
        // checker la présence de la propriété error
        // si elle est présente, on renvoie au front un message d'erreur
        if (error) {
            return response.status(400).json(error.message);
        }
        
        // sinon, on passe le bébé au middleware suivant
        return next();
    };
    return myMw;
};

module.exports = validator;
