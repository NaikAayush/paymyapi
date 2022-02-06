import { Component, OnInit } from '@angular/core';
import { BigNumber } from 'ethers';
import { ContractService } from 'src/app/services/contract/contract.service';
import { EthersService } from 'src/app/services/ethers/ethers.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-dev-add-plan',
  templateUrl: './dev-add-plan.component.html',
  styleUrls: ['./dev-add-plan.component.css'],
})
export class DevAddPlanComponent implements OnInit {
  loading: boolean = false;
  message: string = '';
  api_url: string = '';
  perMonthLimit: number = 0;
  pricePerMonth: string = '';
  perSecondLimit: number = 0;
  pricePerSecond: number = 0;

  constructor(
    public modal: ModalService,
    private contract: ContractService,
    private ethersService: EthersService
  ) {}

  ngOnInit(): void {}

  async addPlan() {
    this.loading = true;
    const monthlyAmount: number = this.ethersService.toWei(
      this.pricePerMonth
    ) as unknown as number;
    this.pricePerSecond = Math.floor(monthlyAmount / 3600 / 24 / 30);

    await this.contract.addPlan(
      this.pricePerSecond,
      this.perMonthLimit,
      this.perSecondLimit
    );
    this.loading = false;
    this.modal.addNewPlanModal = false;
  }

  cancel() {
    this.modal.addNewPlanModal = false;
  }
}
