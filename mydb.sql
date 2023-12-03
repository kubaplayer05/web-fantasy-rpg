insert into "UserClass" ("name", "desc")
values ('szermierz',
        'Szermierze są nieustraszonymi wojownikami, znakomitymi w walce wręcz. Ich umiejętności z bronią są niezrównane, a zwinność i siła sprawiają, że są niebezpiecznymi przeciwnikami na polu bitwy. Zręczność w posługiwaniu się różnymi rodzajami broni pozwala im na elastyczne dostosowywanie się do sytuacji. Są tarczą obronną dla swojej drużyny, gotowi stawić czoła każdemu wyzwaniu z odwagą i honorem.'),
       ('mag',
        'Magowie posiadają niezwykłą moc zaklęć i tajemniczych artefaktów. Ich umiejętności opierają się na mistycznych energiach, dzięki którym potrafią manipulować rzeczywistością. Od strasznego ognistego zaklęcia po uzdrawiające czary, magowie są kluczowym elementem drużyny. Jednak z wielką mocą przychodzi odpowiedzialność, a magowie muszą uważać, by nie wpaść w pokusę używania zakazanych zaklęć, które mogą przynieść katastrofalne skutki.'),
       ('łucznik',
        'Łucznicy są mistrzami w sztuce precyzyjnego łuku. Z daleka potrafią zestrzelić przeciwnika z zaskakującą celnością, zanim ten zbliży się na odległość wręcz. Są znani ze swojej zręczności i umiejętności maskowania się w otoczeniu. Łucznicy potrafią ostrzeliwać wrogów strzałami z trudem dostrzegalnego miejsca, zapewniając drużynie strategiczną przewagę. Ich spryt i szybkość sprawiają, że są niezastąpieni w zadaniach wymagających dystansu i tajemniczego podejścia do walki.')
;

insert into "Weapon" ("name", "desc", "isDefault", "minUserLvl",
                      "rarity", "classId", "atk", "def", "int", "sta")
values ('Drewniany Miecz Nowicjusza', 'Prosty, solidny drewniany miecz,
idealny dla początkujących szermierzy.
Choć może brakować mu finezji bardziej
 zaawansowanych broni, to jest niezawodny
 w nauce podstawowych technik walki.', true, 1, 'COMMON', 1, 15, 5, 0, 5),
       ('Rózga Nowicjusza', 'Zwykła rózga wykonana z giętkiego drewna. Pomimo swojej prostoty, jest doskonałym narzędziem
dla początkującego maga, umożliwiając mu naukę podstawowych zaklęć.',
        true, 1, 'COMMON', 2, 10, 0, 12, 8),
       ('Łuk Nowicjusza', 'Prosty, lekki łuk wykonany z drewna i struny. Doskonały dla początkującego łucznika,
umożliwiający naukę celności i kontroli nad strzałami.', true, 1, 'COMMON', 3,
        12, 3, 0, 7);

insert into "Admin" ("id","name", "hashedPassword")
values ('1', 'admin', '$2b$10$Tk5WOOUhoc1W3sjBvCXOreha./keMdxCzuqQk5o9ps/hwiUZJR2C2');

insert into "Skill" ("name", "desc", "baseDmg", "classId", "turnCount",
                     "stuning", "bleeding", "isDefault")
values ('Rozprawa Miecza', 'Szermierz szybko atakuje przeciwnika
 serią precyzyjnych cięć.', 20, 1, 1, false, false, true),
       ('Kula Ognia', 'Mag rzuca kulą ognia, zadając obrażenia przeciwnikowi.',
        25, 2, 1, true, false, true),
       ('Strzał Zatruty', 'Łucznik strzela strzałem zatrutym, powodując
krwawienie u przeciwnika.', 15, 3, 2, false, true, true);

insert into "Skill" ("name", "desc", "baseDmg", "turnCount",
                     "stuning", "bleeding", "isDefault")
values ('Mistrzowska Koncentracja', 'Postać skupia się, zyskując krótkotrwały bonus
do wszystkich statystyk.', 0, 3, false, false, true);

INSERT INTO "Monster" ("name", "desc", "baseExp", "hp", "atk",
                       "def", "sta", "int", "lvl")
VALUES ('Ciemnoskrzydła Harpia',
        'Te potworne stworzenia łączą cechy ptaka drapieżnego z ludzkim wyglądem. Ostrze ich pazurów i krwawe upierzenie sprawiają, że są temidające, atakując z góry swoje ofiary.',
        50, 80, 25, 10, 20, 8, 10),
       ('Gnijący Nekromanta',
        'Ten potężny czarownik, dawno temu przekroczony granice śmierci, rządzi hordami zombi i wampirów. Jego zgniłe szaty i zimne spojrzenie sprawiają, że to potworne zjawisko jest strachem każdego podróżnika.',
        100, 120, 18, 15, 25, 30, 15);