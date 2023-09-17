import jwt from 'jsonwebtoken';

export const generateJWT = (id: number, email: string) => {
  return jwt.sign(
      {id, email},                              // auth data
      JSON.stringify(process.env.SECRET_KEY),   // secret key for create jwt
      {expiresIn: '24h'}                        // lifespan
    )
}
