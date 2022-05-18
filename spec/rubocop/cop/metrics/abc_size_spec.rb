# frozen_string_literal: true

require 'spec_helper'

describe RuboCop::Cop::Metrics::AbcSize, :config do
  subject(:cop) { described_class.new(config) }

  context 'when Max is 0' do
    let(:cop_config) { { 'Max' => 0 } }

    it 'accepts an emppty method' do
      inspect_source(cop, ['def method_name', 'end'])
      expect(cop.offenses).to be_empty
    end

    registers_offense(for: 'an if modifier',
                      with_size: 2.24,
                      code: 'call_foo if some_condition') # 0 + 2*2 + 1*1

    registers_offense(for: 'an assignment of a local variable',
                      with_size: 1,
                      code: 'x = 1')

    registers_offense(
      for: 'complex content including A, B, and C scores',
      with_size: 6.4, # square root of 1*1 + 5*5 + 2*2, rounded
      code: ['my_options = Hash.new if 1 == 1 || 2 == 2', # 1, 3, 2
             'my_options.each do |key, value|',           # 0, 1, 0
             '  p key',                                   # 0, 1, 0
             '  p value',                                 # 0, 1, 0
             'end']
    )
  end

  context 'when Max is 2' do
    let(:cop_config) { { 'Max' => 2 } }

    it 'accepts two assignments' do
      inspect_source(cop, ['def method_name',
                           '  x = 1',
                           '  y = 2',
                           'end'])
      expect(cop.offenses).to be_empty
    end
  end
end
