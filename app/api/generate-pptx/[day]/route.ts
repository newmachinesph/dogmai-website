import { NextResponse } from 'next/server';
import PptxGenJS from 'pptxgenjs';
import { getDayContent, getWeekContent } from '../../../presentations/curriculumData';

// Theme colors
const colors = {
  black: '060503',
  cream: 'f4efe6',
  orange: 'f97316',
  green: '22c55e',
  blue: '3b82f6',
  purple: 'a855f7',
  darkGray: '2e2e2e',
  lightGray: 'd8c9b0',
  mutedGray: 'c9b89b',
};

const phaseColors: Record<number, string> = {
  1: colors.green,
  2: colors.blue,
  3: colors.purple,
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ day: string }> }
) {
  try {
    const { day: dayParam } = await params;
    const dayNumber = parseInt(dayParam.replace('day', ''), 10);

    const dayContent = getDayContent(dayNumber);
    const weekContent = dayContent ? getWeekContent(dayContent.week) : undefined;

    if (!dayContent || !weekContent) {
      return NextResponse.json(
        { error: 'Day not found' },
        { status: 404 }
      );
    }

    const phaseColor = phaseColors[weekContent.phase];

    const pptx = new PptxGenJS();

    // Set presentation properties
    pptx.author = 'DOGM.AI';
    pptx.title = `Week ${dayContent.week} Day ${dayContent.dayOfWeek}: ${dayContent.title}`;
    pptx.subject = `DOGM.AI Bootcamp - Day ${dayNumber}`;
    pptx.company = 'DOGM.AI';

    // ============================================
    // SLIDE 1: Title Slide
    // ============================================
    const slide1 = pptx.addSlide();
    slide1.background = { color: colors.black };

    // Phase badge
    slide1.addShape('roundRect', {
      x: 0.5,
      y: 1.5,
      w: 2.5,
      h: 0.35,
      fill: { color: phaseColor },
    });

    slide1.addText(`Phase ${weekContent.phase}: ${weekContent.phaseName}`, {
      x: 0.5,
      y: 1.5,
      w: 2.5,
      h: 0.35,
      fontSize: 10,
      fontFace: 'Arial',
      color: weekContent.phase === 1 ? colors.black : 'ffffff',
      bold: true,
      align: 'center',
      valign: 'middle',
    });

    // Section label
    slide1.addText(`// WEEK ${dayContent.week} • DAY ${dayContent.dayOfWeek}`, {
      x: 0.5,
      y: 2.0,
      w: 9,
      h: 0.4,
      fontSize: 14,
      fontFace: 'Courier New',
      color: colors.orange,
    });

    // Orange accent line
    slide1.addShape('rect', {
      x: 0.5,
      y: 2.5,
      w: 1,
      h: 0.05,
      fill: { color: colors.orange },
    });

    // Main title
    slide1.addText(dayContent.title, {
      x: 0.5,
      y: 2.7,
      w: 9,
      h: 0.8,
      fontSize: 40,
      fontFace: 'Arial',
      color: colors.cream,
      bold: true,
    });

    // Subtitle
    slide1.addText(dayContent.subtitle, {
      x: 0.5,
      y: 3.5,
      w: 9,
      h: 0.5,
      fontSize: 20,
      fontFace: 'Courier New',
      color: colors.lightGray,
    });

    // Description
    slide1.addText(dayContent.description, {
      x: 0.5,
      y: 4.1,
      w: 9,
      h: 0.5,
      fontSize: 16,
      fontFace: 'Courier New',
      color: colors.mutedGray,
    });

    // DOGM.AI branding
    slide1.addText('DOGM.AI', {
      x: 0.5,
      y: 5.1,
      w: 3,
      h: 0.4,
      fontSize: 16,
      fontFace: 'Arial',
      color: colors.cream,
      bold: true,
    });

    slide1.addText("AI-Native Coding Bootcamp", {
      x: 0.5,
      y: 5.45,
      w: 5,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Courier New',
      color: colors.mutedGray,
    });

    // ============================================
    // SLIDE 2: Agenda
    // ============================================
    const slide2 = pptx.addSlide();
    slide2.background = { color: colors.black };

    slide2.addText("// TODAY'S AGENDA", {
      x: 0.5,
      y: 0.4,
      w: 9,
      h: 0.3,
      fontSize: 12,
      fontFace: 'Courier New',
      color: colors.orange,
    });

    slide2.addText("What We'll Learn Today", {
      x: 0.5,
      y: 0.8,
      w: 9,
      h: 0.7,
      fontSize: 32,
      fontFace: 'Arial',
      color: colors.cream,
      bold: true,
    });

    dayContent.topics.forEach((topic, idx) => {
      const yPos = 1.7 + idx * 0.75;

      // Topic number
      slide2.addText(String(idx + 1).padStart(2, '0'), {
        x: 0.5,
        y: yPos,
        w: 0.6,
        h: 0.5,
        fontSize: 20,
        fontFace: 'Arial',
        color: colors.green,
        bold: true,
      });

      // Topic text
      slide2.addText(topic, {
        x: 1.2,
        y: yPos,
        w: 8,
        h: 0.5,
        fontSize: 18,
        fontFace: 'Courier New',
        color: colors.cream,
        valign: 'middle',
      });
    });

    // Project box if exists
    if (dayContent.project) {
      const projectY = 1.7 + dayContent.topics.length * 0.75 + 0.3;

      slide2.addShape('rect', {
        x: 0.5,
        y: projectY,
        w: 9,
        h: 0.8,
        fill: { color: '0f1a0f' },
        line: { color: colors.green, width: 2 },
      });

      slide2.addText(`🚀 PROJECT: ${dayContent.project}`, {
        x: 0.7,
        y: projectY + 0.15,
        w: 8.6,
        h: 0.5,
        fontSize: 16,
        fontFace: 'Courier New',
        color: colors.green,
        bold: true,
      });
    }

    // ============================================
    // SLIDES 3+: Topic Details
    // ============================================
    dayContent.topics.forEach((topic, idx) => {
      const slide = pptx.addSlide();
      slide.background = { color: colors.black };

      slide.addText(`// TOPIC ${idx + 1}`, {
        x: 0.5,
        y: 0.4,
        w: 9,
        h: 0.3,
        fontSize: 12,
        fontFace: 'Courier New',
        color: colors.orange,
      });

      slide.addText(topic, {
        x: 0.5,
        y: 0.8,
        w: 9,
        h: 0.7,
        fontSize: 28,
        fontFace: 'Arial',
        color: colors.cream,
        bold: true,
      });

      // Placeholder content area
      slide.addShape('rect', {
        x: 0.5,
        y: 1.8,
        w: 9,
        h: 3.2,
        fill: { color: '1a1a1a' },
        line: { color: colors.darkGray, width: 1 },
      });

      slide.addText('Content for this topic will be covered in class', {
        x: 0.5,
        y: 3.0,
        w: 9,
        h: 0.5,
        fontSize: 18,
        fontFace: 'Courier New',
        color: colors.mutedGray,
        align: 'center',
      });
    });

    // ============================================
    // PROJECT SLIDE (if project exists)
    // ============================================
    if (dayContent.project) {
      const projectSlide = pptx.addSlide();
      projectSlide.background = { color: colors.black };

      projectSlide.addText('// HANDS-ON PROJECT 🚀', {
        x: 0.5,
        y: 0.4,
        w: 9,
        h: 0.3,
        fontSize: 12,
        fontFace: 'Courier New',
        color: colors.orange,
      });

      projectSlide.addText("Let's Build Something!", {
        x: 0.5,
        y: 0.8,
        w: 9,
        h: 0.7,
        fontSize: 32,
        fontFace: 'Arial',
        color: colors.cream,
        bold: true,
      });

      projectSlide.addShape('rect', {
        x: 0.5,
        y: 1.7,
        w: 9,
        h: 2,
        fill: { color: '0f1a0f' },
        line: { color: colors.green, width: 2 },
      });

      projectSlide.addText(dayContent.project, {
        x: 0.7,
        y: 2.0,
        w: 8.6,
        h: 0.6,
        fontSize: 24,
        fontFace: 'Arial',
        color: colors.green,
        bold: true,
      });

      projectSlide.addText('Apply what you\'ve learned by building a real project!', {
        x: 0.7,
        y: 2.7,
        w: 8.6,
        h: 0.5,
        fontSize: 16,
        fontFace: 'Courier New',
        color: colors.lightGray,
      });

      // Warning box
      projectSlide.addShape('rect', {
        x: 0.5,
        y: 4.0,
        w: 9,
        h: 0.8,
        fill: { color: '1a1006' },
        line: { color: colors.orange, width: 2 },
      });

      projectSlide.addText('Remember: Write every line yourself. No copy-pasting! 💪', {
        x: 0.7,
        y: 4.15,
        w: 8.6,
        h: 0.5,
        fontSize: 16,
        fontFace: 'Courier New',
        color: colors.orange,
      });
    }

    // ============================================
    // KEY TAKEAWAYS SLIDE
    // ============================================
    const takeawaysSlide = pptx.addSlide();
    takeawaysSlide.background = { color: colors.black };

    takeawaysSlide.addText('// KEY TAKEAWAYS 🧠', {
      x: 0.5,
      y: 0.4,
      w: 9,
      h: 0.3,
      fontSize: 12,
      fontFace: 'Courier New',
      color: colors.orange,
    });

    takeawaysSlide.addText('What We Learned Today', {
      x: 0.5,
      y: 0.8,
      w: 9,
      h: 0.7,
      fontSize: 32,
      fontFace: 'Arial',
      color: colors.cream,
      bold: true,
    });

    dayContent.keyTakeaways.forEach((takeaway, idx) => {
      const yPos = 1.7 + idx * 0.8;

      takeawaysSlide.addShape('rect', {
        x: 0.5,
        y: yPos,
        w: 9,
        h: 0.65,
        fill: { color: '0f1a0f' },
        line: { color: colors.darkGray, width: 1 },
      });

      takeawaysSlide.addText('✓', {
        x: 0.7,
        y: yPos + 0.1,
        w: 0.4,
        h: 0.45,
        fontSize: 18,
        fontFace: 'Arial',
        color: colors.green,
      });

      takeawaysSlide.addText(takeaway, {
        x: 1.2,
        y: yPos + 0.1,
        w: 8,
        h: 0.45,
        fontSize: 16,
        fontFace: 'Courier New',
        color: colors.cream,
        valign: 'middle',
      });
    });

    // ============================================
    // WHAT'S NEXT SLIDE
    // ============================================
    const nextSlide = pptx.addSlide();
    nextSlide.background = { color: colors.black };

    nextSlide.addText("// COMING UP NEXT ⏭️", {
      x: 0.5,
      y: 0.4,
      w: 9,
      h: 0.3,
      fontSize: 12,
      fontFace: 'Courier New',
      color: colors.orange,
    });

    nextSlide.addText(`Preview: Day ${dayNumber + 1}`, {
      x: 0.5,
      y: 0.8,
      w: 9,
      h: 0.7,
      fontSize: 32,
      fontFace: 'Arial',
      color: colors.cream,
      bold: true,
    });

    // Preview box
    nextSlide.addShape('rect', {
      x: 0.5,
      y: 1.7,
      w: 9,
      h: 1.5,
      fill: { color: '1a1006' },
      line: { color: colors.orange, width: 2 },
    });

    nextSlide.addText(dayContent.nextDayPreview, {
      x: 0.7,
      y: 2.0,
      w: 8.6,
      h: 0.8,
      fontSize: 20,
      fontFace: 'Courier New',
      color: colors.orange,
    });

    // Homework section if exists
    if (dayContent.homework && dayContent.homework.length > 0) {
      nextSlide.addShape('rect', {
        x: 0.5,
        y: 3.5,
        w: 9,
        h: 1.5,
        fill: { color: '0f1a0f' },
        line: { color: colors.green, width: 2 },
      });

      nextSlide.addText('📚 HOMEWORK', {
        x: 0.7,
        y: 3.65,
        w: 8.6,
        h: 0.4,
        fontSize: 16,
        fontFace: 'Arial',
        color: colors.green,
        bold: true,
      });

      dayContent.homework.forEach((hw, idx) => {
        nextSlide.addText(`${idx + 1}. ${hw}`, {
          x: 0.7,
          y: 4.1 + idx * 0.35,
          w: 8.6,
          h: 0.3,
          fontSize: 14,
          fontFace: 'Courier New',
          color: colors.cream,
        });
      });
    }

    // ============================================
    // THANK YOU SLIDE
    // ============================================
    const thankYouSlide = pptx.addSlide();
    thankYouSlide.background = { color: colors.black };

    thankYouSlide.addText(`// END OF DAY ${dayNumber}`, {
      x: 0.5,
      y: 2.0,
      w: 9,
      h: 0.4,
      fontSize: 14,
      fontFace: 'Courier New',
      color: colors.orange,
    });

    // Orange accent line
    thankYouSlide.addShape('rect', {
      x: 0.5,
      y: 2.5,
      w: 1,
      h: 0.05,
      fill: { color: colors.orange },
    });

    thankYouSlide.addText('Great Job Today!', {
      x: 0.5,
      y: 2.7,
      w: 9,
      h: 0.8,
      fontSize: 44,
      fontFace: 'Arial',
      color: colors.cream,
      bold: true,
    });

    thankYouSlide.addText("Any questions? Let's discuss! 🙋", {
      x: 0.5,
      y: 3.5,
      w: 9,
      h: 0.5,
      fontSize: 18,
      fontFace: 'Courier New',
      color: colors.lightGray,
    });

    // DOGM.AI branding
    thankYouSlide.addText('DOGM.AI', {
      x: 0.5,
      y: 4.7,
      w: 3,
      h: 0.4,
      fontSize: 20,
      fontFace: 'Arial',
      color: colors.cream,
      bold: true,
    });

    thankYouSlide.addText('hello@dogm.ai  •  dogm.ai', {
      x: 0.5,
      y: 5.1,
      w: 5,
      h: 0.3,
      fontSize: 14,
      fontFace: 'Courier New',
      color: colors.mutedGray,
    });

    // Generate the presentation as a buffer
    const buffer = await pptx.write({ outputType: 'nodebuffer' }) as Buffer;

    const weekNum = dayContent.week;
    const dayOfWeek = dayContent.dayOfWeek;
    const safeTitle = dayContent.title.replace(/[^a-zA-Z0-9]/g, '');

    // Return the file as a download
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': `attachment; filename="DOGM-Week${weekNum}-Day${dayOfWeek}-${safeTitle}.pptx"`,
      },
    });
  } catch (error) {
    console.error('Error generating PPTX:', error);
    return NextResponse.json(
      { error: 'Failed to generate presentation' },
      { status: 500 }
    );
  }
}
