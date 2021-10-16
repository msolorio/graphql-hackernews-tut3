require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function signup(parent, args, context) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: {
      name: args.name,
      email: args.email,
      password 
    }
  })

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    token,
    user
  }
}


async function login(parent, args, context) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email }
  })

  if (!user) {
    return { errorMessage: 'No user found' };
  }

  const valid = await bcrypt.compare(args.password, user.password);

  if (!valid) {
    return { errorMessage: 'Password is invalid' };
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    token,
    user
  }
}


function post(parent, args, context) {
  const { userId } = context;

  return context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } }
    }
  });
}

module.exports = {
  signup,
  login,
  post
}
