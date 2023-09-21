import jwt from 'jsonwebtoken';

export const generateJWT = (id: number, email: string, firstName?: string, lastName?: string) => {
  return jwt.sign(
      {id, email, firstName, lastName},                              // auth data
      JSON.stringify(process.env.SECRET_KEY),   // secret key for create jwt
      {expiresIn: '24h'}                        // lifespan
    )
}
