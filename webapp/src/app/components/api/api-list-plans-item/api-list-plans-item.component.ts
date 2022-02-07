import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractService } from 'src/app/services/contract/contract.service';
import { EthersService } from 'src/app/services/ethers/ethers.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SuperfluidService } from 'src/app/services/superfluid/superfluid.service';

@Component({
  selector: 'app-api-list-plans-item',
  templateUrl: './api-list-plans-item.component.html',
  styleUrls: ['./api-list-plans-item.component.css'],
})
export class ApiListPlansItemComponent implements OnInit {
  @Input() data: any;
  @Input() idx: any;
  monthlyAmount: any;
  @Input() message: any;
  loading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private ethersService: EthersService,
    private contract: ContractService,
    private superfluid: SuperfluidService,
    public modal: ModalService
  ) {}

  ngOnInit() {
    console.log(this.data.pricePerSecond);

    // const monthlyAmount: number = this.ethersService.fromWei(
    //   this.pricePerMonth
    // ) as unknown as number;
    const a = this.ethersService.fromWei(
      this.data.pricePerSecond
    ) as unknown as number;
    const monthlyAmount = a * 3600 * 24 * 30;
    this.monthlyAmount = Math.ceil(monthlyAmount);
  }

  async buy() {
    this.loading = true;
    await this.superfluid.startFlow(
      await this.ethersService.getAddress(),
      this.route.snapshot.paramMap.get('id') as string,
      this.data.pricePerSecond
    );
    const id = this.route.snapshot.paramMap.get('id');
    await this.contract.subscribe(id as string, this.idx);

    this.loading = false;
    this.modal.generateTokenModal = true;
  }
}
