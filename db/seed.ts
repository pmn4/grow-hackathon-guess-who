import { db } from "./db";
import { providers } from "./schema";

async function seed() {
  try {
    // Seed models
    await db.delete(providers);
    await db.insert(providers).values([
      {
        imageUrl: "/provider-images/image-10.jpg",
        imageDescription:
          "The image features a young man with short hair, wearing glasses and a black shirt. He is standing outside on a sunny day, possibly enjoying some fresh air or taking a break from his daily routine. The outdoor setting suggests that the weather might be pleasant enough for spending time outside.",
        name: "Alejandro Ramirez",
        description:
          "I am a licensed psychologist with over 10 years of experience helping individuals and families navigate life's challenges. My approach is holistic, combining traditional talk therapy with mindfulness techniques to help clients achieve lasting change. In my free time, I enjoy hiking and practicing yoga.",
      },
      {
        imageUrl: "/provider-images/image-11.jpg",
        imageDescription:
          "The man is wearing a black shirt with a gray jacket over it. He has short hair and appears to be smiling for the camera. The background of the image features a wall that adds depth to the scene.",
        name: "Diego Martinez",
        description:
          "As a cognitive behavioral therapist, I specialize in helping individuals overcome anxiety, depression, and other mental health concerns. My approach is grounded in evidence-based techniques, and I am committed to providing a safe and supportive space for clients to grow and heal. Outside of work, I enjoy playing guitar and exploring the great outdoors.",
      },
      {
        imageUrl: "/provider-images/image-12.jpg",
        imageDescription:
          "The woman is wearing a white shirt and has her arms crossed. She appears to be smiling for the camera.",
        name: "Fatima Ali",
        description:
          "I am a licensed marriage and family therapist with a passion for helping couples and families build stronger connections. My approach is person-centered, and I believe that every individual has the potential to create a fulfilling life. In my free time, I love trying new recipes and practicing hot yoga.",
      },
      {
        imageUrl: "/provider-images/image-13.jpg",
        imageDescription:
          "The woman is wearing a white shirt and has her hair pulled back into a ponytail. She is smiling at the camera with a gold necklace around her neck. The background features a wallpapered room, giving the impression of a well-decorated space.",
        name: "Isabella Fernandez",
        description:
          "As a psychiatrist, I specialize in treating mood and anxiety disorders using medication and therapy. My approach is patient-focused, and I believe that the most effective treatment plans are tailored to each individual's unique needs. Outside of work, I enjoy playing soccer and reading science fiction.",
      },
      {
        imageUrl: "/provider-images/image-14.jpg",
        imageDescription:
          "The man is wearing a blue sweater with white stripes on it. He has a smile on his face as he poses for the camera. The background features a window that allows natural light to enter the room, creating a bright and welcoming atmosphere.",
        name: "Ethan Kim",
        description:
          "I am a licensed art therapist, helping clients express themselves and find meaning through creative projects. My approach is client-centered, and I believe that the arts can be a powerful tool for healing and growth. In my free time, I love exploring local art galleries and practicing calligraphy.",
      },
      {
        imageUrl: "/provider-images/image-16.jpg",
        imageDescription:
          "The woman is wearing a white jacket with buttons on it. She has her hands behind her back and is smiling for the camera. Her hair is pulled into a ponytail, and she appears to be posing confidently in front of a white background.",
        name: "Mei Chen",
        description:
          "I am a licensed psychologist with expertise in trauma-focused cognitive behavioral therapy. My approach is compassionate and evidence-based, and I believe that every individual has the potential to heal and grow despite life's challenges. Outside of work, I enjoy hiking and practicing mindfulness meditation.",
      },
      {
        imageUrl: "/provider-images/image-17.jpg",
        imageDescription:
          "The man is sitting on a bench with his legs crossed while wearing a brown jacket. He has a beard and appears to be smiling for the camera. The scene takes place outdoors, as there are stairs visible in the background.",
        name: "Hiroshi Tanaka",
        description:
          "I am a licensed social worker with a passion for helping individuals navigate life transitions and build resilience. My approach is person-centered, and I believe that every individual has the power to create a fulfilling life. In my free time, I love trying new fitness classes and practicing calligraphy.",
      },
      {
        imageUrl: "/provider-images/image-18.jpg",
        imageDescription:
          "The man is wearing a suit jacket with a button on it. He has short hair and is smiling for the camera.",
        name: "Javier Hernandez",
        description:
          "I am a licensed psychiatrist with expertise in treating ADHD and related conditions using medication and therapy. My approach is patient-focused, and I believe that the most effective treatment plans are tailored to each individual's unique needs. Outside of work, I enjoy playing guitar and practicing tai chi.",
      },
      {
        imageUrl: "/provider-images/image-19.jpg",
        imageDescription:
          "The woman is sitting on a blue couch with her hands behind her head. She has long hair that is parted to one side, and she appears to be smiling for the camera. The background features a window, giving the scene an outdoor feel.",
        name: "Sofia Rossi",
        description:
          "I am a licensed acupuncturist and herbalist, helping clients achieve balance and wellness through traditional Chinese medicine techniques. My approach is holistic, and I believe that the body has an innate ability to heal itself when given the right tools. In my free time, I love exploring local farmers markets and practicing qigong.",
      },
      {
        imageUrl: "/provider-images/image-20.jpg",
        imageDescription:
          "The woman is wearing a black and white dress with a black shirt underneath. She has dark hair styled in a bun, and she is smiling for the camera. The background features a wall that appears to be white or grey in color.",
        name: "Yasmin Ahmed",
        description:
          "I am a licensed psychologist with expertise in cognitive behavioral therapy for anxiety and depression. My approach is evidence-based and compassionate, and I believe that every individual has the potential to achieve lasting change. Outside of work, I enjoy hiking and practicing yoga.",
      },
      {
        imageUrl: "/provider-images/image-21.jpg",
        imageDescription:
          "The woman is wearing a red jacket and has her hands crossed while sitting at a table. She appears to be posing for a picture, possibly for a professional or personal purpose. The background of the image is black, which adds an element of contrast to the scene.",
        name: "Anika Singh",
        description:
          "I am a licensed counselor with a passion for helping individuals and families navigate life's challenges. My approach is person-centered, and I believe that every individual has the potential to create a fulfilling life. In my free time, I love trying new recipes and practicing hot yoga.",
      },
      {
        imageUrl: "/provider-images/image-22.jpg",
        imageDescription:
          "The man is wearing a blue shirt with white buttons. He has short hair and a beard. The background is white, giving the image a clean and simple look.",
        name: "Kwame Johnson",
        description:
          "I am a licensed psychologist with expertise in trauma-focused cognitive behavioral therapy. My approach is compassionate and evidence-based, and I believe that every individual has the potential to heal and grow despite life's challenges. Outside of work, I enjoy playing soccer and reading science fiction.",
      },
      {
        imageUrl: "/provider-images/image-27.jpg",
        imageDescription:
          "The man is wearing a suit jacket and tie, with his shirt open. He has a beard and mustache, and he appears to be smiling for the camera. The background features a green wall, possibly indicating an indoor setting or a professional environment.",
        name: "Liam O’Connor",
        description:
          "I am a licensed art therapist, helping clients express themselves and find meaning through creative projects. My approach is client-centered, and I believe that the arts can be a powerful tool for healing and growth. In my free time, I love exploring local art galleries and practicing calligraphy.",
      },
      {
        imageUrl: "/provider-images/image-28.jpg",
        imageDescription:
          "The man is wearing a blue shirt with white stripes on it. He has a beard and mustache, and his hair is short. The image appears to have been taken indoors, possibly in an office or a room with windows. There are two cars visible in the background, one behind the other.",
        name: "Omar El-Sayed",
        description:
          "I am a licensed psychologist with expertise in trauma-focused cognitive behavioral therapy. My approach is compassionate and evidence-based, and I believe that every individual has the potential to heal and grow despite life's challenges. Outside of work, I enjoy hiking and practicing mindfulness meditation.",
      },
      {
        imageUrl: "/provider-images/image-29.jpg",
        imageDescription:
          "The man is wearing a gray jacket with a black shirt underneath it. He has his hands in his pockets and appears to be posing for the camera. The background is white, giving the image a clean and minimalistic look.",
        name: "Raj Patel",
        description:
          "I am a licensed marriage and family therapist with a passion for helping couples and families build stronger connections. My approach is person-centered, and I believe that every individual has the potential to create a fulfilling life. In my free time, I love trying new recipes and practicing hot yoga.",
      },
      {
        imageUrl: "/provider-images/image-30.jpg",
        imageDescription:
          "The man is wearing a white shirt with blue stripes. He has his hands in his pockets and is smiling for the camera. The background features a wall that appears to be made of glass or mirrored material, giving an impression of depth to the image.",
        name: "Miguel Santos",
        description:
          "I am a licensed psychiatrist with expertise in treating mood and anxiety disorders using medication and therapy. My approach is patient-focused, and I believe that the most effective treatment plans are tailored to each individual's unique needs. Outside of work, I enjoy playing soccer and reading science fiction.",
      },
      {
        imageUrl: "/provider-images/image-31.jpg",
        imageDescription:
          "The man is wearing a suit jacket with a blue shirt underneath. He has glasses on his face and is posing for a picture. The background features an office environment with multiple TVs mounted on the walls, as well as chairs placed around the room. There are also several people in the background, indicating that this might be a busy workplace or event.",
        name: "Benjamin Bailey",
        description:
          "I am a licensed acupuncturist and herbalist, helping clients achieve balance and wellness through traditional Chinese medicine techniques. My approach is holistic, and I believe that the body has an innate ability to heal itself when given the right tools. In my free time, I love exploring local farmers markets and practicing qigong.",
      },
      {
        imageUrl: "/provider-images/image-32.jpg",
        imageDescription:
          "The woman is standing on a sidewalk next to a street with several cars parked along it. She appears to be smiling for the camera while posing for a picture. The scene seems to be set in an urban environment, possibly near a shopping area or a busy street.",
        name: "Keiko Nakamura",
        description:
          "I am a licensed psychologist with expertise in cognitive behavioral therapy for anxiety and depression. My approach is evidence-based and compassionate, and I believe that every individual has the potential to achieve lasting change. Outside of work, I enjoy hiking and practicing yoga.",
      },
      {
        imageUrl: "/provider-images/image-33.jpg",
        imageDescription:
          "The woman is standing in a large room with wooden floors and white walls. She is wearing blue jeans and a black shirt. The room features a dining table surrounded by chairs, and there are several books scattered throughout the space. In addition to the furniture, there are multiple potted plants placed around the room, adding a touch of greenery to the environment. A vase can also be seen on one of the tables, further enhancing the room's decoration.",
        name: "Leila Hassan",
        description:
          "I am a licensed counselor with a passion for helping individuals and families navigate life's challenges. My approach is person-centered, and I believe that every individual has the potential to create a fulfilling life. In my free time, I love trying new recipes and practicing hot yoga.",
      },
      {
        imageUrl: "/provider-images/image-34.jpg",
        imageDescription:
          "The woman is wearing a black top with a white collar. She has dark hair and is smiling for the camera. The background appears to be blurry, possibly indicating that she is posing indoors or in a controlled environment.",
        name: "Maria Garcia",
        description:
          "I am a licensed psychologist with expertise in trauma-focused cognitive behavioral therapy. My approach is compassionate and evidence-based, and I believe that every individual has the potential to heal and grow despite life's challenges. Outside of work, I enjoy playing soccer and reading science fiction.",
      },
      {
        imageUrl: "/provider-images/image-36.jpg",
        imageDescription:
          "The woman is wearing a white jacket with blue sleeves. She has long hair that she has styled into a ponytail. Her smile appears genuine as she poses for the camera. The office environment features multiple chairs and desks, along with several TVs mounted on the walls. There are also keyboards placed on some of the desks. The woman seems to be in a professional setting, possibly an office or workspace.",
        name: "Aisha Khan",
        description:
          "I am a licensed art therapist, helping clients express themselves and find meaning through creative projects. My approach is client-centered, and I believe that the arts can be a powerful tool for healing and growth. In my free time, I love exploring local art galleries and practicing calligraphy.",
      },
      {
        imageUrl: "/provider-images/image-37.jpg",
        imageDescription:
          "The woman is wearing a blue shirt and has blonde hair. She appears to be smiling for the camera as she poses for the picture.",
        name: "Chloe Murphy",
        description:
          "I am a licensed psychologist with expertise in trauma-focused cognitive behavioral therapy. My approach is compassionate and evidence-based, and I believe that every individual has the potential to heal and grow despite life's challenges. Outside of work, I enjoy hiking and practicing mindfulness meditation.",
      },
      {
        imageUrl: "/provider-images/image-38.jpg",
        imageDescription: "The man is wearing a white shirt with a collar.",
        name: "Tyler Rogers",
        description:
          "I am a licensed marriage and family therapist with a passion for helping couples and families build stronger connections. My approach is person-centered, and I believe that every individual has the potential to create a fulfilling life. In my free time, I love trying new recipes and practicing hot yoga.",
      },
      {
        imageUrl: "/provider-images/image-39.jpg",
        imageDescription:
          "The woman is wearing a green shirt and has long hair. She appears to be smiling for the camera.",
        name: "Grace Morgan",
        description:
          "I am a licensed psychiatrist with expertise in treating mood and anxiety disorders using medication and therapy. My approach is patient-focused, and I believe that the most effective treatment plans are tailored to each individual's unique needs. Outside of work, I enjoy playing soccer and reading science fiction.",
      },
      {
        imageUrl: "/provider-images/image-40.jpg",
        imageDescription:
          "The man is wearing a blue shirt with white stripes and glasses on his head. He has a beard and mustache and appears to be smiling for the camera. The image shows him standing in front of a group of people, possibly at an office or workplace setting. There are several chairs visible around the room, as well as a dining table.",
        name: "William Ward",
        description:
          "I am a licensed acupuncturist and herbalist, helping clients achieve balance and wellness through traditional Chinese medicine techniques. My approach is holistic, and I believe that the body has an innate ability to heal itself when given the right tools. In my free time, I love exploring local farmers markets and practicing qigong.",
      },
      {
        imageUrl: "/provider-images/image-41.jpg",
        imageDescription:
          "The man is wearing a blue suit jacket with a pink pocket square. He has a white shirt underneath his jacket and is smiling for the camera. The man appears to be well-dressed, possibly for a formal event or business meeting.",
        name: "Brandon Sanchez",
        description:
          "I am a licensed psychologist with expertise in cognitive behavioral therapy for anxiety and depression. My approach is evidence-based and compassionate, and I believe that every individual has the potential to achieve lasting change. Outside of work, I enjoy hiking and practicing yoga.",
      },
      {
        imageUrl: "/provider-images/image-42.jpg",
        imageDescription:
          "The man is wearing a white shirt with a collar. He has short hair and appears to be smiling for the camera. The background is white, giving the image a clean and professional appearance.",
        name: "Christian Watson",
        description:
          "I am a licensed counselor with a passion for helping individuals and families navigate life's challenges. My approach is person-centered, and I believe that every individual has the potential to create a fulfilling life. In my free time, I love trying new recipes and practicing hot yoga.",
      },
      {
        imageUrl: "/provider-images/image-43.jpg",
        imageDescription:
          "The woman is wearing a blue jacket and glasses. She has dark hair and is smiling for the camera.",
        name: "Natalie Reed",
        description:
          "I am a licensed psychologist with expertise in trauma-focused cognitive behavioral therapy. My approach is compassionate and evidence-based, and I believe that every individual has the potential to heal and grow despite life's challenges. Outside of work, I enjoy playing soccer and reading science fiction.",
      },
      {
        imageUrl: "/provider-images/image-44.jpg",
        imageDescription:
          "The woman is sitting on a bench with her legs crossed, wearing glasses and a red shirt. She appears to be smiling for the camera. The background features green plants, creating a pleasant outdoor atmosphere.",
        name: "Victoria Morris",
        description:
          "I am a licensed art therapist, helping clients express themselves and find meaning through creative projects. My approach is client-centered, and I believe that the arts can be a powerful tool for healing and growth. In my free time, I love exploring local art galleries and practicing calligraphy.",
      },
      {
        imageUrl: "/provider-images/image-46.jpg",
        imageDescription:
          "The woman is sitting on a blue couch with her legs crossed. She has long hair that she has styled into a ponytail. She is wearing a black shirt and appears to be smiling for the camera. The room features a window, which allows natural light to enter the space. There are also two chairs in the scene, one located near the woman and another further away from her.",
        name: "Zoe Barnes",
        description:
          "I am a licensed psychologist with expertise in trauma-focused cognitive behavioral therapy. My approach is compassionate and evidence-based, and I believe that every individual has the potential to heal and grow despite life's challenges. Outside of work, I enjoy hiking and practicing mindfulness meditation.",
      },
      {
        imageUrl: "/provider-images/image-47.jpg",
        imageDescription:
          "The woman is sitting at a table with her laptop computer. She has long black hair that she is holding on top of her head as she smiles for the camera. The room appears to be white, giving it a clean and bright atmosphere. There are two cups placed near the edge of the table, possibly containing drinks or snacks for the woman while she works on her laptop.",
        name: "Ella Howard",
        description:
          "I am a licensed marriage and family therapist with a passion for helping couples and families build stronger connections. My approach is person-centered, and I believe that every individual has the potential to create a fulfilling life. In my free time, I love trying new recipes and practicing hot yoga.",
      },
      {
        imageUrl: "/provider-images/image-48.jpg",
        imageDescription:
          "The man is wearing a blue suit jacket with white buttons, a white shirt, and a tie. He has short hair and appears to be smiling for the camera. The background features trees and water, creating a pleasant outdoor setting.",
        name: "Daniel Campbell",
        description:
          "I am a licensed psychiatrist with expertise in treating mood and anxiety disorders using medication and therapy. My approach is patient-focused, and I believe that the most effective treatment plans are tailored to each individual's unique needs. Outside of work, I enjoy playing soccer and reading science fiction.",
      },
      {
        imageUrl: "/provider-images/image-49.jpg",
        imageDescription:
          "The woman is wearing a red suit with a white shirt underneath. She has long hair that is styled nicely. The background of the image is black, giving it an elegant appearance.",
        name: "Hannah Parker",
        description:
          "I am a licensed acupuncturist and herbalist, helping clients achieve balance and wellness through traditional Chinese medicine techniques. My approach is holistic, and I believe that the body has an innate ability to heal itself when given the right tools. In my free time, I love exploring local farmers markets and practicing qigong.",
      },
      {
        imageUrl: "/provider-images/image-5.jpg",
        imageDescription:
          "The woman is sitting on a white chair with her hands folded together. She appears to be wearing a black jacket and has blonde hair. The room she is in features a kitchen area with an oven, sink, and dining table. There are also several chairs placed around the room, as well as a vase on display.",
        name: "Isabella Foster",
        description:
          "I am a licensed psychologist with expertise in cognitive behavioral therapy for anxiety and depression. My approach is evidence-based and compassionate, and I believe that every individual has the potential to achieve lasting change. Outside of work, I enjoy hiking and practicing yoga.",
      },
      {
        imageUrl: "/provider-images/image-54.jpg",
        imageDescription: "The man is wearing a blue shirt with white buttons.",
        name: "Jacob Cox",
        description:
          "I am a licensed counselor with a passion for helping individuals and families navigate life's challenges. My approach is person-centered, and I believe that every individual has the potential to create a fulfilling life. In my free time, I love trying new recipes and practicing hot yoga.",
      },
      {
        imageUrl: "/provider-images/image-55.jpg",
        imageDescription:
          "The man is wearing a blue shirt with gold chains around his neck. He has a beard and mustache, and he appears to be smiling for the camera. The background of the image is dark grey, creating a contrasting effect between the subject and the environment.",
        name: "Nathaniel Griffin",
        description:
          "I am a licensed psychologist with expertise in trauma-focused cognitive behavioral therapy. My approach is compassionate and evidence-based, and I believe that every individual has the potential to heal and grow despite life's challenges. Outside of work, I enjoy playing soccer and reading science fiction.",
      },
      {
        imageUrl: "/provider-images/image-56.jpg",
        imageDescription:
          "The woman is wearing a gray shirt with a black necktie. She has short hair and is smiling for the camera. The image appears to be professionally taken, as she is posing confidently in an office setting. There are multiple chairs visible around her, suggesting that this could be a conference room or a waiting area.",
        name: "Olivia Edwards",
        description:
          "I am a licensed art therapist, helping clients express themselves and find meaning through creative projects. My approach is client-centered, and I believe that the arts can be a powerful tool for healing and growth. In my free time, I love exploring local art galleries and practicing calligraphy.",
      },
      {
        imageUrl: "/provider-images/image-57.jpg",
        imageDescription:
          "The woman is wearing a yellow shirt and has long hair. She is sitting down with her hands on her knees and smiling at the camera. The background appears to be white, giving the image a clean and simple look.",
        name: "Rachel Phillips",
        description:
          "I am a licensed psychologist with expertise in trauma-focused cognitive behavioral therapy. My approach is compassionate and evidence-based, and I believe that every individual has the potential to heal and grow despite life's challenges. Outside of work, I enjoy hiking and practicing mindfulness meditation.",
      },
      {
        imageUrl: "/provider-images/image-58.jpg",
        imageDescription:
          "The woman is wearing a black suit with a white shirt underneath. She has long hair that she has styled to look neat and professional. Her smile appears genuine as she poses for the picture, possibly in front of a door or a window. The overall appearance suggests that she might be working in an office environment or attending a formal event.",
        name: "Samantha James",
        description:
          "I am a licensed marriage and family therapist with a passion for helping couples and families build stronger connections. My approach is person-centered, and I believe that every individual has the potential to create a fulfilling life. In my free time, I love trying new recipes and practicing hot yoga.",
      },
      {
        imageUrl: "/provider-images/image-59.jpg",
        imageDescription:
          "The woman is wearing a black shirt with a white button on it. She has long hair that reaches down to her waist. Her outfit appears to be casual and comfortable, as she poses for the picture. The setting seems to be indoors, possibly in a room or studio.",
        name: "Zoe Jenkins",
        description:
          "I am a licensed psychiatrist with expertise in treating mood and anxiety disorders using medication and therapy. My approach is patient-focused, and I believe that the most effective treatment plans are tailored to each individual's unique needs. Outside of work, I enjoy playing soccer and reading science fiction.",
      },
      {
        imageUrl: "/provider-images/image-6.jpg",
        imageDescription:
          "The man is wearing a suit and tie with a red and black patterned necktie. He has a smile on his face as he poses for the picture. The background features a brick wall, giving the image an urban feel.",
        name: "Brian Flores",
        description:
          "I am a licensed acupuncturist and herbalist, helping clients achieve balance and wellness through traditional Chinese medicine techniques. My approach is holistic, and I believe that the body has an innate ability to heal itself when given the right tools. In my free time, I love exploring local farmers markets and practicing qigong.",
      },
      {
        imageUrl: "/provider-images/image-60.jpg",
        imageDescription:
          "The man is wearing a suit jacket and tie, with his hands crossed. He appears to be well-dressed for a formal event or professional setting. The image is black and white, giving it an old-fashioned feel.",
        name: "Christopher Martinez",
        description:
          "I am a licensed psychologist with expertise in cognitive behavioral therapy for anxiety and depression. My approach is evidence-based and compassionate, and I believe that every individual has the potential to achieve lasting change. Outside of work, I enjoy hiking and practicing yoga.",
      },
      {
        imageUrl: "/provider-images/image-61.jpg",
        imageDescription:
          "The woman is wearing a red shirt with glasses on her head. She has a smile on her face as she poses for the camera.",
        name: "Emily Johnson",
        description:
          "I am a licensed counselor with a passion for helping individuals and families navigate life's challenges. My approach is person-centered, and I believe that every individual has the potential to create a fulfilling life. In my free time, I love trying new recipes and practicing hot yoga.",
      },
      {
        imageUrl: "/provider-images/image-63.jpg",
        imageDescription:
          "The man is wearing a suit jacket with a purple shirt underneath. He has a beard and is sitting on a chair. The background appears to be black, giving the image an artistic feel.",
        name: "David Wilson",
        description:
          "I am a licensed psychologist with expertise in trauma-focused cognitive behavioral therapy. My approach is compassionate and evidence-based, and I believe that every individual has the potential to heal and grow despite life's challenges. Outside of work, I enjoy playing soccer and reading science fiction.",
      },
      {
        imageUrl: "/provider-images/image-64.jpg",
        imageDescription:
          "The woman is standing on a rooftop with a city skyline in the background. She is wearing a white jacket and has her hands at her sides. The image appears to be black and white, giving it an artistic feel.",
        name: "Laura Jackson",
        description:
          "I am a licensed art therapist, helping clients express themselves and find meaning through creative projects. My approach is client-centered, and I believe that the arts can be a powerful tool for healing and growth. In my free time, I love exploring local art galleries and practicing calligraphy.",
      },
      {
        imageUrl: "/provider-images/image-65.jpg",
        imageDescription:
          "The man is wearing a blue shirt and has a smile on his face. He appears to be enjoying himself as he poses for the picture. The image also features some potted plants nearby, adding a touch of greenery to the scene.",
        name: "James Taylor",
        description:
          "I am a licensed psychologist with expertise in trauma-focused cognitive behavioral therapy. My approach is compassionate and evidence-based, and I believe that every individual has the potential to heal and grow despite life's challenges. Outside of work, I enjoy hiking and practicing mindfulness meditation.",
      },
      {
        imageUrl: "/provider-images/image-7.jpg",
        imageDescription: "The man is wearing a white shirt with pink stripes.",
        name: "Kevin Hughes",
        description:
          "I am a licensed marriage and family therapist with a passion for helping couples and families build stronger connections. My approach is person-centered, and I believe that every individual has the potential to create a fulfilling life. In my free time, I love trying new recipes and practicing hot yoga.",
      },
      {
        imageUrl: "/provider-images/image-8.jpg",
        imageDescription:
          "The man is wearing a blue shirt and has a beard. He appears to be smiling for the camera while standing in an office environment. The room contains multiple chairs and tables, suggesting that it might be a workspace or meeting area.",
        name: "Nicholas Bell",
        description:
          "I am a licensed psychiatrist with expertise in treating mood and anxiety disorders using medication and therapy. My approach is patient-focused, and I believe that the most effective treatment plans are tailored to each individual's unique needs. Outside of work, I enjoy playing soccer and reading science fiction.",
      },
      {
        imageUrl: "/provider-images/image-9.jpg",
        imageDescription:
          "The woman is wearing a blue shirt and has blonde hair. She is smiling at the camera with her hands on her hips. The background features a couch and a chair.",
        name: "Sarah Miller",
        description:
          'I am a licensed acupuncturist and herbalist, helping clients achieve balance and wellness through traditional Chinese medicine techniques. My approach is holistic, and I believe that the body has an innate ability to heal itself when given the right tools. In my free time, I love exploring local farmers markets and practicing qigong."}',
      },
    ]);

    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit(0);
  }
}

async function read() {
  try {
    const data = await db.select().from(providers).orderBy(providers.name);
    console.log(data);
  } catch (error) {
    console.error("Error reading data:", error);
  } finally {
    process.exit(0);
  }
}

// seed();
read();

// How to run this seed script:
// 1. Make sure you have ts-node installed globally: npm install -g ts-node
// 2. Run the script using ts-node: ts-node db/seed.ts
// 3. Alternatively, add a script to your package.json:
//    "scripts": {
//      "seed": "ts-node --compiler-options '{"module":"CommonJS"}' -P ./tsconfig.json db/seed.ts"
//    }
//    Then run: yarn seed
