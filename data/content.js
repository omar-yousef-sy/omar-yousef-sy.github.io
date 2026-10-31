// =====================================================================================================
//  Site content — edit this file to add lectures, files and articles (no other file needs to change).
//  Each entry is { ... }, entries are separated by commas. Text has an Arabic (_ar) and English (_en) version;
//  if one is empty the other is shown. Dates are written YYYY-MM-DD. Files go in the folders named below.
// =====================================================================================================
window.SITE_DATA = {

  // Courses: lectures are grouped by these ids (field "course" in each lecture).
  courses: [
    { id: 'gp', title_ar: 'الفيزياء العامة 1 و2', title_en: 'General Physics I & II', desc_ar: 'النظري والعملي: الميكانيك، الحرارة، الكهرباء والمغناطيسية.', desc_en: 'Theory and laboratory: mechanics, heat, electricity and magnetism.' },
    { id: 'eng', title_ar: 'الفيزياء الهندسية', title_en: 'Engineering Physics', desc_ar: 'فيزياء لطلاب البرامج الهندسية مع تطبيقات عملية.', desc_en: 'Physics for engineering programmes with practical applications.' },
    { id: 'qm', title_ar: 'مدخل إلى ميكانيك الكم', title_en: 'Introductory Quantum Mechanics', desc_ar: 'من تجارب الكم الأولى إلى معادلة شرودنغر وتطبيقاتها البسيطة.', desc_en: 'From the first quantum experiments to the Schrödinger equation and simple applications.' },
    { id: 'nano', title_ar: 'مدخل إلى علوم وتقانة النانو', title_en: 'Introduction to Nanoscience & Nanotechnology', desc_ar: 'تأثيرات الحجم، الحصر الكمومي، طرق التحضير والتوصيف.', desc_en: 'Size effects, quantum confinement, synthesis and characterization.' },
    { id: 'energy', title_ar: 'فيزياء مواد تخزين الطاقة', title_en: 'Physics of Materials for Energy Storage', desc_ar: 'البطاريات والمكثفات الفائقة: المواد والقياسات الكهركيميائية.', desc_en: 'Batteries and supercapacitors: materials and electrochemical measurements.' },
    { id: 'thinfilm', title_ar: 'تحضير الأغشية الرقيقة وتوصيفها (عملي)', title_en: 'Thin-Film Fabrication & Characterization (lab)', desc_ar: 'تقنيات الترسيب والقياسات البصرية والبنيوية.', desc_en: 'Deposition techniques and optical and structural measurements.' },
  ],

  // Lectures: put the PDF in files/lectures/ and add an entry like the example below.
  //  type: 'lecture' | 'slides' | 'notes' | 'exam'
  //  Example (remove the // at the start of each line to use it):
  //  { title_ar: 'المحاضرة 1: المتجهات والحركة', title_en: 'Lecture 1: Vectors and motion', course: 'gp', type: 'lecture',
  //    date: '2026-11-05', file: 'files/lectures/gp-lecture-01.pdf', desc_ar: 'مقدمة المقرر.', desc_en: 'Course introduction.' },
  lectures: [
  ],

  // Other files (CV, posters, research summaries…): put the PDF in files/ and add an entry.
  documents: [
    { title_ar: 'السيرة الذاتية الأكاديمية', title_en: 'Academic CV', type: 'file', date: '2026-10-31', file: 'files/cv/Omar-Yousef-CV.pdf',
      desc_ar: 'التدريس والتعليم والبحث في الدكتوراه (بالإنجليزية).', desc_en: 'Teaching, education and doctoral research.' },
  ],

  // Articles: each article is a page in articles/ (copy articles/_template.html), listed here.
  //  category: 'science' | 'culture'
  articles: [
    { slug: 'what-is-nanotechnology', category: 'science', date: '2026-10-31',
      title_ar: 'ما تقانة النانو؟ ولماذا يغيّر الحجمُ خواصَّ المادة', title_en: 'What is nanotechnology — and why size changes a material',
      summary_ar: 'عندما تصغر المادة إلى بضعة نانومترات تتغير ألوانها وتفاعليتها ومغناطيسيتها. لماذا؟', summary_en: 'Shrink a material to a few nanometres and its colour, reactivity and magnetism change. Why?' },
    { slug: 'iron-oxides-sodium-batteries', category: 'science', date: '2026-10-31',
      title_ar: 'أكاسيد الحديد أنوداتٍ لبطاريات أيونات الصوديوم', title_en: 'Iron oxides as anodes for sodium-ion batteries',
      summary_ar: 'مادة رخيصة ووفيرة بسعة نظرية عالية، ومشكلتان يحلّهما الكربون.', summary_en: 'A cheap, abundant material with a high theoretical capacity — and two problems carbon helps solve.' },
  ],
};
