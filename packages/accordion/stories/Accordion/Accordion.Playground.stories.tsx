import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { Accordion, AccordionProps } from '../../src';
import { SELECTION_MODE } from '../../src/constants';
import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<AccordionProps & { 'data-test-id'?: string }> = {
  title: 'Components/Accordion/Accordion',
  component: Accordion,
  parameters: { layout: 'fullscreen' },
  args: {
    'data-test-id': TEST_IDS.accordion.root,
    selectionMode: SELECTION_MODE.Single,
  },
  argTypes: {
    selectionMode: { control: 'select', options: Object.values(SELECTION_MODE) },
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Раскрывающиеся секции с настраиваемым режимом выбора.</DemoHint>
        <DemoActions align='center'>
          {/* Accordion рендерит Context.Provider без DOM-узла; data-test-id ставим на
              обёртку, чтобы корень был адресуем из e2e/spec'ов. */}
          <div className={styles.story} data-test-id={args['data-test-id']}>
            <Accordion {...args}>
              <div className={styles.listM}>
                <Accordion.CollapseBlockPrimary
                  id='collapseBlockPrimary1'
                  title='Rash'
                  subTitle='Green hothead · shades & swagger'
                >
                  <Accordion selectionMode={args.selectionMode}>
                    <div className={styles.listM}>
                      <Accordion.CollapseBlockSecondary view='outline' id='rash-secondary-dossier' title='Dossier'>
                        <Accordion selectionMode={args.selectionMode}>
                          <Accordion.CollapseBlockTertiary id='rash-tertiary-overview' title='Overview'>
                            <p className={styles.paragraph}>
                              Rash is the hot-headed green Battletoad: loud sunglasses, a permanent smirk, and the kind
                              of confidence that walks into a boss fight already trash-talking. He is the default pick
                              in many games and the face of the franchise when the team needs someone to sell an
                              over-the-top punch.
                            </p>
                          </Accordion.CollapseBlockTertiary>
                          <Accordion.CollapseBlockTertiary id='rash-tertiary-moves' title='Signature moves'>
                            <p className={styles.paragraph}>
                              Expect screen-filling special attacks and comedic violence: giant ram horns, spring-loaded
                              kicks, and morph strikes that turn limbs into cartoon weapons. Rash favors speed and
                              aggression over careful spacing—if it can be solved by hitting it harder, he has already
                              committed.
                            </p>
                          </Accordion.CollapseBlockTertiary>
                          <Accordion.CollapseBlockTertiary id='rash-tertiary-trivia' title='Trivia'>
                            <p className={styles.paragraph}>
                              Rash is the Battletoad most players remember first: bright green skin, black shades, and a
                              Saturday-morning attitude ported straight into brutally hard levels. He is the team member
                              who treats impossible platforming like a personal challenge.
                            </p>
                          </Accordion.CollapseBlockTertiary>
                        </Accordion>
                      </Accordion.CollapseBlockSecondary>
                      <Accordion.CollapseBlockSecondary view='outline' id='rash-secondary-legacy' title='16-bit legacy'>
                        <Accordion selectionMode={args.selectionMode}>
                          <Accordion.CollapseBlockTertiary id='rash-tertiary-arcade' title='Arcade attitude'>
                            <p className={styles.paragraph}>
                              Rash embodies the original Rare formula: loud colors, brutal difficulty, and jokes that
                              land between punches. He is the reason many players still hear the pause music in their
                              nightmares—and come back for one more run anyway.
                            </p>
                          </Accordion.CollapseBlockTertiary>
                          <Accordion.CollapseBlockTertiary id='rash-tertiary-cameos' title='Cameos & reboots'>
                            <p className={styles.paragraph}>
                              Whenever Battletoads return—compilation, crossover, or modern revival—Rash is the one on
                              the poster. New moves and art styles change; the shades and swagger stay.
                            </p>
                          </Accordion.CollapseBlockTertiary>
                        </Accordion>
                      </Accordion.CollapseBlockSecondary>
                    </div>
                  </Accordion>
                </Accordion.CollapseBlockPrimary>
                <Accordion.CollapseBlockPrimary
                  id='collapseBlockPrimary2'
                  title='Zitz'
                  subTitle='Tactician · reach & timing'
                >
                  <Accordion selectionMode={args.selectionMode}>
                    <div className={styles.listM}>
                      <Accordion.CollapseBlockSecondary view='outline' id='zitz-secondary-dossier' title='Dossier'>
                        <Accordion selectionMode={args.selectionMode}>
                          <Accordion.CollapseBlockTertiary id='zitz-tertiary-overview' title='Overview'>
                            <p className={styles.paragraph}>
                              Zitz is the cool-headed tactician of the trio: bluish-green skin, a more analytical vibe,
                              and the kind of focus you want when the level designer is clearly angry at you. He often
                              reads as the &quot;brain&quot; of the Battletoads when the story needs a plan before the
                              punching starts.
                            </p>
                          </Accordion.CollapseBlockTertiary>
                          <Accordion.CollapseBlockTertiary id='zitz-tertiary-moves' title='Signature moves'>
                            <p className={styles.paragraph}>
                              Zitz stretches into long-range strikes and precision tools—whip-like limbs and targeted
                              hits that reward timing. Where Rash charges in, Zitz looks for openings, spacing, and the
                              cleanest line through a crowd of enemies.
                            </p>
                          </Accordion.CollapseBlockTertiary>
                          <Accordion.CollapseBlockTertiary id='zitz-tertiary-trivia' title='Trivia'>
                            <p className={styles.paragraph}>
                              In several entries Zitz is positioned as the team leader on paper: the one coordinating
                              rescues, briefing the squad, and keeping morale up when the Turbo Tunnel says hello. He is
                              still a Battletoad, so the plan always ends in a morph attack anyway.
                            </p>
                          </Accordion.CollapseBlockTertiary>
                        </Accordion>
                      </Accordion.CollapseBlockSecondary>
                      <Accordion.CollapseBlockSecondary view='outline' id='zitz-secondary-brief' title='Ops brief'>
                        <Accordion selectionMode={args.selectionMode}>
                          <Accordion.CollapseBlockTertiary id='zitz-tertiary-squad' title='Squad role'>
                            <p className={styles.paragraph}>
                              Zitz is the one drawing routes on a holographic map that definitely does not account for
                              spike walls. He keeps the team pointed at the objective even when the objective is
                              &quot;survive the next thirty seconds.&quot;
                            </p>
                          </Accordion.CollapseBlockTertiary>
                          <Accordion.CollapseBlockTertiary id='zitz-tertiary-intel' title='Enemy intel'>
                            <p className={styles.paragraph}>
                              Dark Queen forces, weird aliens, and whatever the level throws in—Zitz tries to spot
                              patterns before the morph meter fills. It rarely stays a clean plan, but the attempt
                              counts.
                            </p>
                          </Accordion.CollapseBlockTertiary>
                        </Accordion>
                      </Accordion.CollapseBlockSecondary>
                    </div>
                  </Accordion>
                </Accordion.CollapseBlockPrimary>
                <Accordion.CollapseBlockPrimary
                  id='collapseBlockPrimary3'
                  title='Pimple'
                  subTitle='Heavy bruiser · raw power'
                >
                  <Accordion selectionMode={args.selectionMode}>
                    <div className={styles.listM}>
                      <Accordion.CollapseBlockSecondary view='outline' id='pimple-secondary-dossier' title='Dossier'>
                        <Accordion selectionMode={args.selectionMode}>
                          <Accordion.CollapseBlockTertiary id='pimple-tertiary-overview' title='Overview'>
                            <p className={styles.paragraph}>
                              Pimple is the heavy bruiser: darker, bulkier, and built like a refrigerator that learned
                              martial arts. He is the Battletoad you bring when something needs to stop existing in one
                              hit—or when the plot needs a kidnapping victim to kick the adventure into gear.
                            </p>
                          </Accordion.CollapseBlockTertiary>
                          <Accordion.CollapseBlockTertiary id='pimple-tertiary-moves' title='Signature moves'>
                            <p className={styles.paragraph}>
                              Pimple trades finesse for raw power: huge punches, crushing grapples, and morphs that feel
                              like dropping a safe on someone. If the enemy has armor, spikes, or attitude, Pimple is
                              already rolling up his sleeves.
                            </p>
                          </Accordion.CollapseBlockTertiary>
                          <Accordion.CollapseBlockTertiary id='pimple-tertiary-trivia' title='Trivia'>
                            <p className={styles.paragraph}>
                              Fans of the original NES classic remember Pimple as part of the opening stakes: one moment
                              you are a toad on a couch, the next the Dark Queen has plans and Pimple is off-screen
                              trouble. That setup is pure Battletoads: big personalities, bigger fists, and difficulty
                              that does not apologize.
                            </p>
                          </Accordion.CollapseBlockTertiary>
                        </Accordion>
                      </Accordion.CollapseBlockSecondary>
                      <Accordion.CollapseBlockSecondary view='outline' id='pimple-secondary-story' title='Story hook'>
                        <Accordion selectionMode={args.selectionMode}>
                          <Accordion.CollapseBlockTertiary id='pimple-tertiary-setup' title='Cold open'>
                            <p className={styles.paragraph}>
                              Pimple is the stakes in humanoid-toad form: when he goes missing, the couch gets empty and
                              the mission gets personal. Someone has to throw the first punch, and it will not be
                              subtle.
                            </p>
                          </Accordion.CollapseBlockTertiary>
                          <Accordion.CollapseBlockTertiary id='pimple-tertiary-payoff' title='Rescue fantasy'>
                            <p className={styles.paragraph}>
                              Every bruiser deserves a heroic comeback: Pimple returns ready to flatten whoever thought
                              kidnapping a Battletoad was a good career move. Spoiler: it was not.
                            </p>
                          </Accordion.CollapseBlockTertiary>
                        </Accordion>
                      </Accordion.CollapseBlockSecondary>
                    </div>
                  </Accordion>
                </Accordion.CollapseBlockPrimary>
              </div>
            </Accordion>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<AccordionProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
};
