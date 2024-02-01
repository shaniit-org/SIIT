async function GET() {
  return new Response(
    JSON.stringify({
      status: 200,
      body: "term"
    })
  );
}
export {
  GET
};
