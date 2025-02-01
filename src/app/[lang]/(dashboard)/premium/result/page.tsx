export default async function ResultPage(): Promise<JSX.Element> {
  const product = {
    id: "1",
    name: "THE POWER OF SYMMETRY: ACHIEVING VISUAL BALANCE IN EVERY ROOM OF THE HOME",
    image:
      "https://blog.starfurniture.com/mcprod/wp-content/uploads/2024/12/ST750764_b-e1735065269339-1024x782.jpg",
    content: [
      {
        description:
          "A well-designed room captivates with its harmony, drawing the eye effortlessly across a balanced arrangement of furniture, decor, and architectural details. Symmetry is a powerful design principle that brings order and calmness to any space, whether it’s achieved through perfectly matched elements or a more relaxed, asymmetrical balance. From arranging your living room furniture to creating a serene bedroom retreat, the art of visual equilibrium transforms a house into a cohesive and inviting home. If you’re ready to elevate your interiors, the Star Furniture design team is here with expert tips to help you bring balance and beauty to every room.",
      },
      {
        title: "The Science Behind Symmetry",
        description:
          "If you've ever entered a space and instantly felt drawn in, comfortable, and at ease, chances are that it was designed with symmetry in mind. Whether or not you realize it, rooms that are curated to be balanced and thoughtfully arranged don't only look better; they feel calmer and more welcoming. Similarly, rooms that aren't symmetrical or well-organized can feel disheveled, chaotic, and unappealing. It's no surprise then that symmetrical home design and functional furniture layouts go hand in hand. When you position your furniture in a way that flows naturally, meets the needs of the room, and incorporates practical pieces to achieve symmetry, your home won't only be aesthetically pleasing but delightfully functional.",
      },
      {
        title: "Symmetry in Living Rooms",
        description:
          "To ensure that your living room is arranged with symmetry and balance at the forefront, it's helpful to start with a central focal point within the space. This could be a natural feature already in the room, such as a fireplace, or a piece that you choose to add yourself, such as wall art or a TV. Once you have established the anchor of the room, you can incorporate balance by arranging furniture on either side of it, such as sofas and chairs. Choosing matching sofas or chairs is an easy way to create a cozy seating area while maintaining balance, but you can also achieve asymmetrical balance by pairing a large neutral piece on one side with two smaller, boldly patterned pieces on the other. In order to tie the room together, don't forget to incorporate thoughtful accessories, such as side tables, lamps, and accent furniture. Be sure to look for pieces that complement each other to ensure the end result is cohesive, polished, and, of course, balanced.",
      },
      {
        title: "Symmetry in Bedrooms",
        description:
          "While achieving balance in some areas of your home may be more challenging than others, it's usually a breeze to create symmetry in a bedroom. One reason for this is that there is an obvious focal point: the bed. Once you've found the right place to position the bed, you can easily create symmetry by bringing in matching nightstands, lamps, and artwork to create a cohesive, balanced aesthetic. Fortunately, Star Furniture has an array of bedroom sets and furnishings to simplify the process of pairing pieces in a way that prioritizes symmetry. If you're worried that investing in matching bedroom sets might compromise your personal style, think again. We're proud to offer bedroom furniture in a variety of styles that can be effortlessly mixed and matched, especially with the help of a Star Furniture interior designer.",
      },
      {
        title: "Symmetry in Dining Spaces",
        description:
          "Proportion is everything when it comes to designing a balanced, stylish and functional dining room. To put together the dining room of your dreams, start by bringing in a central dining table with plenty of space for your loved ones to gather around while still being able to move freely around the space. Next, add symmetrical seating arrangements around the table to ensure the weight of the room feels even. Don't forget to add a centerpiece to the table that complements the room's surrounding decor. The result will be a space that is as inviting and practical as it is attractive and warm. No matter what your personal decor style may be, Star Furniture has a wide range of quality dining room furniture to choose from, including this elegant set.",
      },
      {
        title: "Symmetry in Small Spaces and Asymmetrical Balance",
        description:
          "For small spaces where it may not be possible to utilize a variety of furnishings, focusing on asymmetrical balance may be your best option. Instead of selecting perfectly matching furniture for a classic symmetrical look, you can create a modern, playful vibe with asymmetrical balance by mixing and matching various home decor pieces. For instance, pairing one large piece with two smaller ones can make the weight of the room feel evenly distributed. If you have a small or awkwardly shaped space, don't hesitate to reach out to the trusted Star Furniture design team. You may be surprised by the creative solutions they have that can help you achieve a balanced look.",
      },
      {
        title: "Accessorizing for Symmetry",
        description:
          "Accessories play a major role in helping your living spaces feel balanced and visually appealing. The good news is that accessorizing for symmetry couldn't be easier. Oftentimes, if furniture pieces are already arranged in a symmetrical way, all it takes is pairing them with accessories to finish the look, such as matching lamps on two bedside tables. Other times, the accessories themselves can make furniture appear more balanced, such as matching throw pillows on both sides of a sofa, vases on each end of a fireplace mantle, or wall art arranged in an eye-catching gallery wall.",
      },
      {
        title:
          "Bring Visual Balance to Every Room in Your Home with Star Furniture",
        description:
          "If you want to create living spaces that feel visually balanced and effortlessly harmonious, prioritizing symmetry is one of the most effective ways to achieve a designer-approved look. Fortunately, you don't have to be an interior designer to bring visual balance to every room in your home. The Star Furniture design experts are here to help make every home decorating project simple and fun. Visit your favorite Texas furniture store online to explore our quality furniture collections or stop by the store for expert advice and inspiration today!",
      },
    ],
  };

  return (
    <div className="p-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold uppercase">Home Inspiration</h1>
        <p className="text-s text-gray-600">
          Ideas and Inspirations for the Home
        </p>
        <h2 className="mt-10 text-2xl uppercase">
          THE POWER OF SYMMETRY: ACHIEVING VISUAL BALANCE IN EVERY ROOM OF THE
          HOME
        </h2>
      </div>

      <div className="max-w-6xl mx-auto">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto mb-6"
        />

        {product.content.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold uppercase mb-4">
              {section.title}
            </h2>
            <p className="text-gray-600 text-justify">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
