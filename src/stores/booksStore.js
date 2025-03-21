import { defineStore } from 'pinia'
import { useProgressStore } from '@/stores/progressStore'
// Functions
import { validDateInRequestToStore, getLocalISOString } from '@/helpers/datetimeFunctions'

export const useBooksStore = defineStore('books', {
  state: () => ({
    statusList: [
      {
        idStatus: false,
        type: '',
      },
      {
        idStatus: 1,
        type: 'read',
      },
      {
        idStatus: 2,
        type: 'audio',
      },
    ],
    listOfBooks: [
      {
        bookSeries: 'The Horus Heresy',
        title: 'Старая Земля',
        author: 'Ник Кайм',
        isbn: '9785918783375',
        pages: 480,
        audioDuration: 551,
        cover: '9785918783375.webp',
        dateAdd: '2024-12-17T13:24:00+0300',
        dateStart: '2024-12-21T21:42:32+0300',
        dateEnd: '',
        status: 'read',
        pagesRead: 36,
        totalListened: 0,
        isComplete: false,
        description:
          '<p>Примарх Вулкан, телом и духом возродившийся в глубине горы Смертельный Огонь, призывает самых преданных сыновей и готовится к заключительному этапу своих странствий. Разбитые на Исстване V, легионы приостановили победоносное шествие магистра войны по Галактике, но таинственные слухи о возвращении Ферруса Мануса порождают новые противоречия в союзе Железных Рук, Саламандр и Гвардии Ворона. Ощущение незавершенности затрудняет выбор Вулкана — принять участие в войне возмездия против предателей или следовать по своему зыбкому пути к Тронному миру.</p>',
        opinion: '',
      },
      {
        bookSeries: 'Академия',
        title: 'Академия',
        author: 'Айзек Азимов',
        isbn: '9785040939077',
        pages: 320,
        audioDuration: 382,
        cover: '9785040939077.webp',
        dateAdd: '2024-12-19T19:12:21+0300',
        dateStart: '',
        dateEnd: '',
        status: false,
        pagesRead: 0,
        totalListened: 0,
        isComplete: false,
        description:
          '<p>Отдаленное будущее… Человечество покорило космос, а Земля уже давно перестала быть центром Вселенной. Огромные размеры Галактической Империи явно не пошли ей на пользу – уязвимость отдельных планет и неэффективное управление угрожают разрушить все, что было создано с таким трудом. Сможет ли Гэри Сэлдон – ученый, основатель науки «психоистория», восстановить человеческую культуру после грядущей катастрофы и периода варварства?</p>',
        opinion: '',
      },
      {
        bookSeries: 'The Horus Heresy. Primarchs',
        title: 'Сангвиний. Великий Ангел',
        author: 'Крис Райт',
        isbn: '9781800262768',
        pages: 208,
        audioDuration: 337,
        cover: '9781800262768.webp',
        dateAdd: '2025-01-01T17:34:59+0300',
        dateStart: '2025-01-04T21:10:14+0300',
        dateEnd: '2025-01-09T21:52:38+0300',
        status: false,
        pagesRead: 0,
        totalListened: 337,
        isComplete: true,
        description:
          '<p>Сангвиний — Великий Ангел, обожаемый народом примарх, чьи подвиги славятся по всему Империуму, пока Крестовый поход сотрясает Галактику. Однако происхождение IX легиона окутано тайнами и слухами, в самом облике Сангвиния кроется неразрешимая загадка, а полный опасностей родной мир Ангела доступен лишь его молчаливым обитателям.</p><p>Вместе с экспедиционным флотом туда прибывает опальный летописец, который должен составить хронику деяний примарха. Ему придется немало потрудиться, чтобы отличить истину от легенд. Сопровождая космодесантников на войну с врагами Императора, любопытный исследователь узнает куда больше, чем ожидал, — не только об объектах изучения, но и о природе самого Империума.</p>',
        opinion: '',
      },
      {
        bookSeries: 'The Horus Heresy. Primarchs',
        title: 'Мортарион. Бледный Король',
        author: 'Дэвид Аннендейл',
        isbn: '9781800261389',
        pages: 208,
        audioDuration: 331,
        cover: '9781800261389.webp',
        dateAdd: '2025-01-01T17:33:48+0300',
        dateStart: '2025-01-01T20:38:14+0300',
        dateEnd: '2025-01-04T21:09:27+0300',
        status: false,
        pagesRead: 0,
        totalListened: 331,
        isComplete: true,
        description:
          '<p>Система Галаспара издавна страдала под гнетом безжалостного режима. Миллиарды людей неустанно трудились ради обогащения своих господ, влача краткое существование в грязи, нищете и страхе. Однако грехи Галаспара не остались незамеченными Империумом, и вот уже сама Смерть приговорила Строй к уничтожению.</p><p>Мортарион, недавно возглавивший Гвардию Смерти, сошел в этот мир и устроил бойню невообразимых масштабов. Беспрецедентная жестокость кампании Мортариона потрясла Империум. В попытке понять трагедию двое благородных примархов являются на Галаспар, чтобы призвать брата к ответу. Но Бледный Король не потерпит сомнений в своих методах, ведь разящая коса должна с каждым ударом пожинать страшную жатву.</p>',
        opinion: '',
      },
      {
        bookSeries: 'The Horus Heresy. Primarchs',
        title: 'Вулкан. Владыка Змиев',
        author: 'Дэвид Аннендейл',
        isbn: '9785918783863',
        pages: 189,
        audioDuration: 281,
        cover: '9785918783863.webp',
        dateAdd: '2025-01-01T17:38:14+0300',
        dateStart: '2025-01-09T20:37:29+0300',
        dateEnd: '',
        status: 'audio',
        pagesRead: 0,
        totalListened: 138,
        isComplete: false,
        description:
          '<p>Во славу человечества Император ведет свои армии к завоеванию Галактики. Легионы один за другим воссоединяются с примархами. В Тарасском Разделе, в борьбе против чудовищного нашествия орков, часть XVIII легиона отчаянно держит оборону, не зная, что их примарх уже найден. В то же время на Ноктюрне Вулкан создает новую армию, которую ждет обретение истинной цели. И вот настал час и им вступить в бой. Владыке Змиев предстоит не только примерить мантию предводителя и спасти своих сынов, но и выковать новое неразделимое целое.</p>',
        opinion: '',
      },
      {
        bookSeries: '',
        title: 'Цивилизация статуса',
        author: 'Роберт Шекли',
        isbn: '9785389151222',
        pages: 140,
        audioDuration: 335,
        cover: '9785389151222.webp',
        dateAdd: '2024-09-01T13:21:48+0300',
        dateStart: '2024-09-01T14:18:48+0300',
        dateEnd: '2024-09-05T21:49:48+0300',
        status: false,
        pagesRead: 0,
        totalListened: 335,
        isComplete: true,
        description:
          '<p>Эта небольшая антиутопия подтверждает статус Роберта Шекли как непревзойденного мастера фантастических идей, филигранного стилиста и тонкого знатока человеческих душ. Два альтернативных пути развития общества – планета-тюрьма Омега и Земля – оазис порядка и стабильности, в котором всё за тебя заранее предрешено.</p>',
        opinion: '',
      },
      {
        bookSeries: '',
        title: 'Поселок',
        author: 'Кир Булычёв',
        isbn: '9785171665302',
        pages: 400,
        audioDuration: 568,
        cover: '9785171665302.webp',
        dateAdd: '2025-02-26T22:35:11+0300',
        dateStart: '',
        dateEnd: '',
        status: false,
        pagesRead: 0,
        totalListened: 0,
        isComplete: false,
        description:
          '<p>Семнадцать лет назад звездолет землян потерпел крушение на необитаемой планете. Выжило меньше половины членов экипажа. Помощь так и не пришла. Люди выстроили маленький поселок и попытались жить... но жизнь обернулась выживанием и жестокой борьбой за существование. Старели и умирали взрослые, а рожденные в поселке дети росли, в сущности, уже дикарями с жесткой родоплеменной ментальностью — своими для родной им суровой природы и чужими для человеческой цивилизации.</p><p>Три попытки дойти до брошенного корабля, чтобы забрать оттуда необходимые поселянам консервы, лекарства, книги и оружие, уже провалились. И теперь в страшный путь через смертоносный горный перевал отправляется четвертая группа, почти полностью состоящая из подростков...</p>',
        opinion: '',
      },
      {
        bookSeries: 'Миры Марии Семёновой',
        title: 'Лебединая дорога',
        author: 'Мария Семёнова',
        isbn: '9785389097209',
        pages: 544,
        audioDuration: 639,
        cover: '9785389097209.webp',
        dateAdd: '2023-09-26T21:35:11+0300',
        dateStart: '2023-09-27T12:37:11+0300',
        dateEnd: '2023-09-30T22:14:11+0300',
        status: false,
        pagesRead: 544,
        totalListened: 0,
        isComplete: true,
        description:
          '<p>Мария Семёнова, автор знаменитого романа «Волкодав», всегда пишет о сильных людях. В морском абордажном бою и на стенах пылающего города, в снежных горах и чёрной непроходимой чаще, в темнице и небесном чертоге её герои до конца стоят за правду, идут на смерть, защищая друзей, и побеждают зло силой добра.</p><p>Викингам, чьи корабли идут по Лебединой дороге, нечего терять, они оставили прошлое позади, их не пугают великие опасности и кровавые битвы, ибо павшие в сражениях воссядут в Вальхалле, Чертоге Одина, а выжившие покроют себя славой. Драконьи корабли уходят в чужие земли, где правят не Асы и Ваны людей Севера, а славянские Даждьбог и Ярила. Все дальше и дальше ведёт дружину Лебединая дорога...</p>',
        opinion: '',
      },
      {
        bookSeries: 'Миры Марии Семёновой',
        title: 'Меч мертвых',
        author: 'Мария Семёнова, Андрей Константинов',
        isbn: '9785389079618',
        pages: 416,
        audioDuration: 501,
        cover: '9785389079618.webp',
        dateAdd: '2025-02-26T23:15:27+0300',
        dateStart: '',
        dateEnd: '',
        status: false,
        pagesRead: 0,
        totalListened: 0,
        isComplete: false,
        description:
          '<p>Кто сказал, что в эпоху викингов жизнь была бесхитростной и простой?.. Можно было, оказывается, съездив за море с посольством, по возвращении не узнать собственной страны. А получив в своё распоряжение боевой корабль и дружину испытанных храбрецов - вдруг обнаружить, что стал пешкой в игре, где стороны давно забыли о чести...</p><p>Кого выберет отчаянная воительница? Кто завоюет сердце странствующей колдуньи? И что гонит по белому свету таинственного молодого варяга, прячущего под кожаной повязкой половину лица?</p>',
        opinion: '',
      },
      {
        bookSeries: 'The Horus Heresy',
        title: 'Первый Еретик',
        author: 'Аарон Дембски-Боуден',
        isbn: '9785918780381',
        pages: 416,
        audioDuration: 498,
        cover: '9785918780381.webp',
        dateAdd: '2023-06-13T10:24:16+0300',
        dateStart: '2023-06-20T16:59:21+0300',
        dateEnd: '2023-06-24T19:18:21+0300',
        status: false,
        pagesRead: 416,
        totalListened: 0,
        isComplete: true,
        description:
          '<p>Распространив Великий Крестовый Поход от края до края галактики, Император внезапно решает жестко наказать легион Несущих Слово — за слишком медленное приведение к Согласию новых миров и религиозное поклонение ему, Императору Человечества. Для вящей убедительности он приказывает стереть в пыль город, бывший гордостью Несущих Слово. Унижение легиона серьезно пошатнуло душевное равновесие примарха Лоргара и направило его духовные поиски к самому краю материальной вселенной, где варп просачивается в реальный мир, где слышны голоса богов и можно прикоснуться к истине. Эта истина, неприглядная и болезненная, и станет колыбелью Великой Ереси.</p>',
        opinion: '',
      },
      {
        bookSeries: 'Warhammer 40000',
        title: 'Ловец Душ',
        author: 'Аарон Дембски-Боуден',
        isbn: '9785918780374',
        pages: 384,
        audioDuration: 499,
        cover: '9785918780374.webp',
        dateAdd: '2023-12-13T11:52:16+0300',
        dateStart: '2023-12-18T20:58:16+0300',
        dateEnd: '2023-12-20T23:56:16+0300',
        status: false,
        pagesRead: 384,
        totalListened: 0,
        isComplete: true,
        description:
          '<p>Бойтесь этих космодесантников!</p><p>Преданные, отвергнутые светом Императора и преследуемые как еретики, они - мятежники сорок первого тысячелетия. Облаченные в символы смерти, Повелители Ночи остаются безжалостными охотниками и убийцами. Они никогда не раскаются в богохульстве, ставшем причиной их изгнания, и никогда не простят жертвы, принесенной их примархом. Они ведут свою войну с Империумом, скользя во тьме между мирами.</p>',
        opinion: '',
      },
      {
        bookSeries: 'The Horus Heresy',
        title: 'Рожденные в пламени',
        author: 'Ник Кайм',
        isbn: '9785918783931',
        pages: 536,
        audioDuration: 611,
        cover: '9785918783931.webp',
        dateAdd: '2024-08-02T17:26:49+0300',
        dateStart: '',
        dateEnd: '',
        status: false,
        pagesRead: 0,
        totalListened: 0,
        isComplete: false,
        description:
          '<p>Саламандры, рожденные в огненном мире Ноктюрн, верят в самопожертвование и священное право человека на жизнь. В этом мире их отец Вулкан, ставший примархом Императора Человечества, вырос в семье простого кузнеца и выковал легион своих сынов. Их история — сага о героизме, предательстве, трагедии и возрождении. Не раз побывав на самом краю, они всегда возвращались, готовые к бою и никогда не сдающиеся. Легион и его примарх превратились в воплощение вызова всем превратностям судьбы. На наковальню, рожденные в пламени!</p>',
        opinion: '',
      },
      {
        bookSeries: 'Forgotten Realms',
        title: 'Легенда о Темном Эльфе. Книга 1. Отступник. Изгнанник. Воин',
        author: 'Роберт А. Сальваторе',
        isbn: '9785918781012',
        pages: 768,
        audioDuration: 932,
        cover: '9785918781012.webp',
        dateAdd: '2023-11-25T18:24:19+0300',
        dateStart: '',
        dateEnd: '',
        status: false,
        pagesRead: 0,
        totalListened: 0,
        isComplete: false,
        description:
          '<p>Первая трилогия знаменитой саги Роберта Сальваторе о приключениях Темного Эльфа и его друзей!</p><p>Родина темных эльфов — Мензоберранзан — город хаоса, чье величие сравнимо лишь с низостью царящих в нем нравов. Не в силах мириться со страшными законами подземного мира, благородный принц Дзирт До`Урден вынужден покинуть родной дом. Преследуемый мстительными соплеменниками, он вместе с волшебной пантерой Гвенвивар уходит в бесконечные, полные опасностей лабиринты подземной страны. Среди монстров вечного мрака, в мире, где солнцем стал огонь преисподней, темному эльфу предстоит жить, бороться и искать свой путь. Путь, который выведет его наверх, к солнцу и новым приключениям.</p>',
        opinion: '',
      },
      {
        bookSeries: '',
        title: 'Вся Шуттовская рать',
        author: 'Роберт Асприн, Питер Хек',
        isbn: '9785171518196',
        pages: 680,
        audioDuration: 785,
        cover: '9785171518196.webp',
        dateAdd: '2024-12-08T22:58:40+0300',
        dateStart: '',
        dateEnd: '',
        status: false,
        pagesRead: 0,
        totalListened: 0,
        isComplete: false,
        description:
          '<p>Заключительные три романа цикла «Шуттовская рота». Уиллард Шутт по прозвищу Капитан Шутник прочно стоит на ногах под непрерывным напором недоброжелателей! Отчасти это результат его фантастического везения, отчасти - непробиваемого жизнелюбия, да и армейская выучка тоже играет не последнюю роль. Но недаром говорят, что короля делает свита! Рота неудачников и отщепенцев, которой взялся командовать Шутт, просто невероятными темпами становится хорошо отлаженной машиной, состоящей из высокопрофессиональных военных, всегда готовых прийти на выручку друг другу и своему обожаемому командиру. Супермалявка - суровая и справедливая женщина. Обижать не рекомендуется. Гамбольты - коты-разведчики, обладающие мгновенной реакцией.</p><p>Синтианцы - разумные слизни, навыки управления глайдбордом выше всяких похвал. Искрима - повар, которого был бы счастлив увидеть в своем штате любой модный ресторатор. Суши и Рвач - такие разные, но притершиеся друг к другу как две надежные детали одного механизма. И многие, многие другие - люди и зооморфы - вся шуттовская рать...</p>',
        opinion: '',
      },
      {
        bookSeries: '',
        title: 'Айвенго',
        author: 'Вальтер Скотт',
        isbn: '9785907577503',
        pages: 512,
        audioDuration: 642,
        cover: '9785907577503.webp',
        dateAdd: '2023-01-03T21:18:40+0300',
        dateStart: '2023-01-03T21:19:40+0300',
        dateEnd: '2023-01-06T23:33:40+0300',
        status: false,
        pagesRead: 512,
        totalListened: 0,
        isComplete: true,
        description:
          '<p>Исторические романы Вальтера Скотта (1771-1832), основоположника этого жанра, покорили читателей своей увлекательностью еще два века назад. Его книгами продолжают зачитываться по всему миру, а "Айвенго" стал своеобразным эталоном рыцарской истории. Захватывающее повествование о доблести и чести, в котором Средневековье предстает романтической эпохой легендарных сказаний и куртуазной любви. На фоне исторического противостояния норманнов и англосаксов переплелись судьбы смелой Ревекки и доброй леди Ровены, благородного разбойника и короля Ричарда I, шута и честного рыцаря.</p>',
        opinion:
          'Рыцарские турниры, тамплиеры, дух средневековой Англии, персонажи - мой внутренний ребёнок в восторге!',
      },
      {
        bookSeries: '',
        title: '451 по Фаренгейту',
        author: 'Рэй Брэдбери',
        isbn: '9785042040863',
        pages: 304,
        audioDuration: 427,
        cover: '',
        dateAdd: '2023-01-07T10:11:40+0300',
        dateStart: '2023-01-07T10:11:54+0300',
        dateEnd: '2023-01-08T23:42:16+0300',
        status: false,
        pagesRead: 304,
        totalListened: 0,
        isComplete: true,
        description:
          '<p>451° по Фаренгейту — температура, при которой воспламеняется и горит бумага. Философская антиутопия Брэдбери рисует беспросветную картину развития постиндустриального общества. Это мир будущего, в котором все письменные издания безжалостно уничтожаются специальным отрядом пожарных, а хранение книг преследуется по закону. Интерактивное телевидение успешно служит всеобщему оболваниванию. Карательная психиатрия решительно разбирается с редкими инакомыслящими, а на охоту за неисправимыми диссидентами выходит электрический пес… Сенсационным было заявление Брэдбери в 2007 году, что "451° по Фаренгейту" понимают неправильно. Эта книга не о правительственной цензуре, это история о том, как телевидение уничтожает интерес к чтению книг.</p>',
        opinion: '',
      },
      /*
      {
        bookSeries: '',
        title: '',
        author: '',
        isbn: '',
        pages: 0,
        audioDuration: 0,
        cover: '',
        dateAdd: '',
        dateStart: '',
        dateEnd: '',
        status: '',
        pagesRead: 0,
        totalListened: 0,
        isComplete: false,
        description: '<p></p>',
        opinion: '',
      },
      */
    ],
  }),
  getters: {
    /**
     * Возвращает общее количество книг.
     * @param {*} state
     * @returns Number Общее количество книг.
     */
    getBooksCount(state) {
      return state.listOfBooks.length
    },
    /**
     * Возвращает количество законченных книг с разбивкой на прочитанные и прослушанные.
     * Опционально возвращается список книг и указывается период выборки.
     * @param {Boolean} list Список книг
     * @param {Number} year Год
     * @param {Number} month Месяц
     * @returns Object all - закончено, read - прочитано, audio - прослушано
     */
    getBooksCompleteCount: (state) => {
      return (list = false, year = null, month = null) => {
        // Ответ при ошибке
        const response = { list: [], all: 0, read: 0, audio: 0 }

        // Проверка валидности переданных данных.
        if (validDateInRequestToStore(year, month)) {
          // Если данные валидны -
          let completeBooks = state.listOfBooks.filter((item) => {
            // выбираем законченные книги.
            if (item.isComplete) {
              // Дата окончания прочтения книги.
              const itemDateEnd = new Date(item.dateEnd)

              // Если год установлен
              if (year) {
                // и равен переданному значению -
                if (itemDateEnd.getFullYear() === year) {
                  // проверяем передано ли значение месяца.
                  if (month === 0 || month) {
                    // Если да - проверяем и забираем элемент.
                    if (itemDateEnd.getMonth() === month) return item
                  } else return item // Месяц не передан - забираем элемент.
                }
              } else return item // Год не передан - забираем элемент.
            }
          })

          // Формируем массив с ответом на основе отфильтрованных данных.
          response.all = completeBooks.length
          response.read = completeBooks.filter((item) => item.pagesRead).length
          response.audio = completeBooks.filter((item) => item.totalListened).length

          // Если нужен список книг - возвращаем.
          if (list) response.list = completeBooks
        }

        return response
      }
    },
    /**
     * Возвращает список книг, которые в данный момент имеют статус "Читаю" и "Слушаю".
     * Список отсортирован по дате начала.
     * @returns Array Список книг.
     */
    getBooksOnReadingAndOnAudition(state) {
      return state.listOfBooks
        .filter((item) => item.status)
        .sort((a, b) => {
          return new Date(a.dateStart) > new Date(b.dateStart) ? 1 : -1
        })
    },
    /**
     * Возвращает книги из хранилища с определённой позиции в определённом количестве.
     * @param {Number} start Начальная позиция.
     * @param {Number} limit Количество.
     * @returns {Array} Список книг.
     */
    getBooks: (state) => {
      return (start = 0, limit = null) => {
        return limit ? state.listOfBooks.slice(start, limit) : state.listOfBooks.slice(start)
      }
    },
    /**
     * Возвращает информацию о книге по ISBN.
     * @param {String} isbn ISBN книги.
     * @returns {Object} Информация о книге.
     */
    getBookInfoByISBN: (state) => {
      return (isbn) => {
        return state.listOfBooks.filter((book) => book.isbn === isbn)[0]
      }
    },
    /**
     * @param {String} isbn ISBN книги.
     * @returns {Boolean} Книга в процессе изучения или нет.
     */
    isBookInProgress: (state) => {
      return (isbn) => {
        return state.getBookInfoByISBN(isbn).status ? true : false
      }
    },
    /**
     * @param {String} isbn ISBN книги.
     * @returns {Number} Всего страниц/минут в книге.
     */
    getTotalCount: (state) => {
      return (isbn) => {
        const book = state.getBookInfoByISBN(isbn)
        const status = book.status

        return status === 'read' ? book.pages : status === 'audio' ? book.audioDuration : 0
      }
    },
    /**
     * @param {String} isbn ISBN книги.
     * @returns {Number} Прочитано страниц/прослушано минут в книге.
     */
    getCurrentCount: (state) => {
      return (isbn) => {
        const book = state.getBookInfoByISBN(isbn)
        const status = book.status

        return status === 'read' ? book.pagesRead : status === 'audio' ? book.totalListened : 0
      }
    },
    /**
     * @param {String} isbn ISBN книги.
     * @returns {Number} Прогресс книги в процентах.
     */
    getBookProgressInPercent: (state) => {
      return (isbn) => {
        const total = state.getTotalCount(isbn)
        const current = state.getCurrentCount(isbn)

        return ((current * 100) / total).toFixed(1) || 0
      }
    },
  },
  actions: {
    /**
     * Обновление статуса книги по ISBN.
     * @param {String} isbn
     * @param {Number} idStatus
     */
    updateStatus(isbn, idStatus) {
      if ((isbn, idStatus)) {
        const book = this.listOfBooks.filter((item) => item.isbn === isbn)[0]
        const status = this.statusList.filter((item) => item.idStatus === idStatus)[0].type
        const progress = useProgressStore()

        if (status) {
          book.status = status
          book.dateStart = getLocalISOString()
          book.dateEnd = ''
          book.isComplete = false

          if (idStatus === 1) {
            book.pagesRead = 0
          }
          if (idStatus === 2) {
            book.totalListened = 0
          }
          progress.addNewEvent(isbn, status)
        } else throw new Error('Передан неверный идентификатор статуса.')
      } else
        throw new Error(
          `Невозможно обновить информацию о статусе: не передан один или несколько необходимых параметров (isbn: ${isbn}, idStatus: ${idStatus}).`,
        )
    },
    /**
     * Обновляет количество минут/страниц.
     * @param {String} isbn ISBN книги.
     * @param {Number} count Количество минут/страниц.
     * @param {String} dateStop Дата окончания.
     */
    updateCount(isbn, count, dateStop) {
      if (isbn) {
        const book = this.getBookInfoByISBN(isbn)

        if (count) {
          let cuurentCount, totalCount

          if (book.status === 'read') {
            book.pagesRead += count
            cuurentCount = book.pagesRead
            totalCount = book.pages
          }

          if (book.status === 'audio') {
            book.totalListened += count
            cuurentCount = book.totalListened
            totalCount = book.audioDuration
          }

          if (cuurentCount >= totalCount) {
            this.setBookComplete(isbn, dateStop)
            return true
          } else return false
        } else throw new Error('Не передана информация для обновления данных о книге.')
      } else throw new Error('Не передан ISBN книги для обновления информации.')
    },
    /**
     * Книга закончена. Обновляем информацию об этом.
     * @param {String} isbn ISBN книги.
     * @param {String} dateStop Дата окончания.
     */
    setBookComplete(isbn, dateStop) {
      const book = this.getBookInfoByISBN(isbn)

      // Делаем счётчик прочитанного/прослушанного равным общему количеству, чтобы не было проблем с какими-нибудь подсчётами.
      book.status === 'read' ? (book.pagesRead = book.pages) : false
      book.status === 'audio' ? (book.totalListened = book.audioDuration) : false
      // Выставляем значения, соответствующие законченной книге.
      book.isComplete = true
      book.dateEnd = dateStop
      book.status = false
    },
    /**
     * Добавляет мнение о книге.
     * @param {String} isbn ISBN книги.
     * @param {String} text Мнение о книге.
     */
    setOpinion(isbn, text) {
      const book = this.getBookInfoByISBN(isbn)

      book.opinion = text
    },
    /**
     * Добавляет новую книгу в хранилище.
     * @param {Object} book Данные о книге.
     */
    addNewBook(book) {
      this.listOfBooks.push({
        bookSeries: book.serie,
        title: book.name,
        author: book.author,
        isbn: String(book.isbn),
        pages: book.pages,
        audioDuration: book.audio,
        cover: '',
        dateAdd: getLocalISOString(),
        dateStart: '',
        dateEnd: '',
        status: false,
        pagesRead: 0,
        totalListened: 0,
        isComplete: false,
        description: `<p>${book.descr.split('\n').join('</p><p>')}</p>`,
        opinion: '',
      })
    },
  },
})
