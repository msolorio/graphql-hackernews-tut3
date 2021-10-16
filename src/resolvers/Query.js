function info() {
  return "This is the real hackernews website";
}

function feed(parent, args, context) {
  return context.prisma.link.findMany();
}

module.exports = {
  info,
  feed
};
